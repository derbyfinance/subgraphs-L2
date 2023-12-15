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
  RebalanceBasket,
  Transfer
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
  let entity = new BasketId(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.owner = event.params.owner
  entity.basketId = event.params.basketId
  entity.vaultNumber = event.params.vaultNumber

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
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

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleRebalanceBasket(event: RebalanceBasketEvent): void {
  let entity = new RebalanceBasket(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.basketId = event.params.basketId
  entity.rebalancingPeriod = event.params.rebalancingPeriod
  entity.unredeemedRewards = event.params.unredeemedRewards
  entity.redeemedRewards = event.params.redeemedRewards
  entity.deltaAllocations = event.params.deltaAllocations

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
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
