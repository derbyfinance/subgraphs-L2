import { BigInt } from '@graphprotocol/graph-ts';
import {
  Approval as ApprovalEvent,
  ApprovalForAll as ApprovalForAllEvent,
  BasketId as BasketIdEvent,
  PushProtocolAllocations as PushProtocolAllocationsEvent,
  RebalanceBasket as RebalanceBasketEvent,
  Transfer as TransferEvent
} from "../generated/Game/Game"
import {
  Approval,
  ApprovalForAll,
  BasketId,
  PushProtocolAllocations,
  Transfer,
  Player,
  Race
} from "../generated/schema"

export function handleApproval(event: ApprovalEvent): void {
  let entity = new Approval(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.owner = event.params.owner
  entity.approved = event.params.approved
  entity.tokenId = event.params.tokenId

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleApprovalForAll(event: ApprovalForAllEvent): void {
  let entity = new ApprovalForAll(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.owner = event.params.owner
  entity.operator = event.params.operator
  entity.approved = event.params.approved

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleBasketId(event: BasketIdEvent): void {
  let basket = new BasketId(event.params.basketId.toHex());
  basket.owner = event.params.owner;
  basket.basketId = event.params.basketId;
  basket.vaultNumber = event.params.vaultNumber;
  basket.redeemedRewards = BigInt.fromI32(0);
  basket.unredeemedRewards = BigInt.fromI32(0);
  basket.stakedAmount = BigInt.fromI32(0);

  basket.blockNumber = event.block.number;
  basket.blockTimestamp = event.block.timestamp;
  basket.transactionHash = event.transaction.hash;

  let player = Player.load(event.params.owner);
  if (!player) {
    player = new Player(event.params.owner);
    player.save();
  }

  basket.save();
}

export function handlePushProtocolAllocations(
  event: PushProtocolAllocationsEvent
): void {
  let entity = new PushProtocolAllocations(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.chain = event.params.chain
  entity.vault = event.params.vault
  entity.deltas = event.params.deltas
  for (let i = 0; i < event.params.deltas.length; i++) {
    entity.currentAllocations[i] = entity.currentAllocations[i].plus(event.params.deltas[i]);
  }

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleRebalanceBasket(event: RebalanceBasketEvent): void {
  let basket = BasketId.load(event.params.basketId.toHex());
  if (!basket) return;

  basket.rebalancingPeriod = event.params.rebalancingPeriod;
  basket.unredeemedRewards = event.params.unredeemedRewards;
  basket.redeemedRewards = event.params.redeemedRewards;
  basket.deltaAllocations = event.params.deltaAllocations;

  const lastAllocations = basket.allocations
    ? basket.allocations
    : new Array<BigInt>(event.params.deltaAllocations.length).fill(BigInt.fromI32(0));
  const allocations = new Array<BigInt>(event.params.deltaAllocations.length);

  let totalAmount: BigInt = BigInt.fromI32(0);

  for (let i = 0; i < event.params.deltaAllocations.length; i++) {
    const delta = event.params.deltaAllocations[i];
    const last = lastAllocations![i] || BigInt.fromI32(0);

    totalAmount = totalAmount.plus(delta);
    allocations[i] = last.plus(delta);
  }

  basket.allocations = allocations;
  basket.stakedAmount = basket.stakedAmount.plus(totalAmount);
  basket.save();

  if (!basket.vaultNumber) return;
  let race = Race.load(basket.vaultNumber.toString().concat(event.params.rebalancingPeriod.toHex()));
  if (!race) {
    race = new Race(basket.vaultNumber.toString().concat(event.params.rebalancingPeriod.toHex()));
    race.vaultNumber = basket.vaultNumber;
  }
  let totalRewards = race.totalRewards;
  if (!totalRewards) totalRewards = BigInt.fromI32(0);
  totalRewards = totalRewards.plus(event.params.unredeemedRewards);

  race.stakedTokens = race.stakedTokens ? race.stakedTokens!.plus(totalAmount) : totalAmount;
  race.rebalancingPeriod = event.params.rebalancingPeriod;
  race.apy = BigInt.fromI32(0); // TODO: calculate APY
  race.totalRewards = totalRewards;

  // allocated tokens
  race.save();
}

export function handleTransfer(event: TransferEvent): void {
  let entity = new Transfer(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.from = event.params.from
  entity.to = event.params.to
  entity.tokenId = event.params.tokenId

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}