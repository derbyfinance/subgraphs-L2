import { newMockEvent } from "matchstick-as"
import { ethereum, Address, BigInt } from "@graphprotocol/graph-ts"
import {
  Approval,
  ApprovalForAll,
  BasketId,
  PushProtocolAllocations,
  RebalanceBasket,
  Transfer
} from "../generated/Game/Game"

export function createApprovalEvent(
  owner: Address,
  approved: Address,
  tokenId: BigInt
): Approval {
  let approvalEvent = changetype<Approval>(newMockEvent())

  approvalEvent.parameters = new Array()

  approvalEvent.parameters.push(
    new ethereum.EventParam("owner", ethereum.Value.fromAddress(owner))
  )
  approvalEvent.parameters.push(
    new ethereum.EventParam("approved", ethereum.Value.fromAddress(approved))
  )
  approvalEvent.parameters.push(
    new ethereum.EventParam(
      "tokenId",
      ethereum.Value.fromUnsignedBigInt(tokenId)
    )
  )

  return approvalEvent
}

export function createApprovalForAllEvent(
  owner: Address,
  operator: Address,
  approved: boolean
): ApprovalForAll {
  let approvalForAllEvent = changetype<ApprovalForAll>(newMockEvent())

  approvalForAllEvent.parameters = new Array()

  approvalForAllEvent.parameters.push(
    new ethereum.EventParam("owner", ethereum.Value.fromAddress(owner))
  )
  approvalForAllEvent.parameters.push(
    new ethereum.EventParam("operator", ethereum.Value.fromAddress(operator))
  )
  approvalForAllEvent.parameters.push(
    new ethereum.EventParam("approved", ethereum.Value.fromBoolean(approved))
  )

  return approvalForAllEvent
}

export function createBasketIdEvent(
  owner: Address,
  basketId: BigInt,
  vaultNumber: BigInt
): BasketId {
  let basketIdEvent = changetype<BasketId>(newMockEvent())

  basketIdEvent.parameters = new Array()

  basketIdEvent.parameters.push(
    new ethereum.EventParam("owner", ethereum.Value.fromAddress(owner))
  )
  basketIdEvent.parameters.push(
    new ethereum.EventParam(
      "basketId",
      ethereum.Value.fromUnsignedBigInt(basketId)
    )
  )
  basketIdEvent.parameters.push(
    new ethereum.EventParam(
      "vaultNumber",
      ethereum.Value.fromUnsignedBigInt(vaultNumber)
    )
  )

  return basketIdEvent
}

export function createPushProtocolAllocationsEvent(
  chain: BigInt,
  vault: Address,
  deltas: Array<BigInt>
): PushProtocolAllocations {
  let pushProtocolAllocationsEvent = changetype<PushProtocolAllocations>(
    newMockEvent()
  )

  pushProtocolAllocationsEvent.parameters = new Array()

  pushProtocolAllocationsEvent.parameters.push(
    new ethereum.EventParam("chain", ethereum.Value.fromUnsignedBigInt(chain))
  )
  pushProtocolAllocationsEvent.parameters.push(
    new ethereum.EventParam("vault", ethereum.Value.fromAddress(vault))
  )
  pushProtocolAllocationsEvent.parameters.push(
    new ethereum.EventParam(
      "deltas",
      ethereum.Value.fromSignedBigIntArray(deltas)
    )
  )

  return pushProtocolAllocationsEvent
}

export function createRebalanceBasketEvent(
  basketId: BigInt,
  rebalancingPeriod: BigInt,
  unredeemedRewards: BigInt,
  redeemedRewards: BigInt,
  deltaAllocations: Array<BigInt>
): RebalanceBasket {
  let rebalanceBasketEvent = changetype<RebalanceBasket>(newMockEvent())

  rebalanceBasketEvent.parameters = new Array()

  rebalanceBasketEvent.parameters.push(
    new ethereum.EventParam(
      "basketId",
      ethereum.Value.fromUnsignedBigInt(basketId)
    )
  )
  rebalanceBasketEvent.parameters.push(
    new ethereum.EventParam(
      "rebalancingPeriod",
      ethereum.Value.fromUnsignedBigInt(rebalancingPeriod)
    )
  )
  rebalanceBasketEvent.parameters.push(
    new ethereum.EventParam(
      "unredeemedRewards",
      ethereum.Value.fromSignedBigInt(unredeemedRewards)
    )
  )
  rebalanceBasketEvent.parameters.push(
    new ethereum.EventParam(
      "redeemedRewards",
      ethereum.Value.fromSignedBigInt(redeemedRewards)
    )
  )
  rebalanceBasketEvent.parameters.push(
    new ethereum.EventParam(
      "deltaAllocations",
      ethereum.Value.fromSignedBigIntArray(deltaAllocations)
    )
  )

  return rebalanceBasketEvent
}

export function createTransferEvent(
  from: Address,
  to: Address,
  tokenId: BigInt
): Transfer {
  let transferEvent = changetype<Transfer>(newMockEvent())

  transferEvent.parameters = new Array()

  transferEvent.parameters.push(
    new ethereum.EventParam("from", ethereum.Value.fromAddress(from))
  )
  transferEvent.parameters.push(
    new ethereum.EventParam("to", ethereum.Value.fromAddress(to))
  )
  transferEvent.parameters.push(
    new ethereum.EventParam(
      "tokenId",
      ethereum.Value.fromUnsignedBigInt(tokenId)
    )
  )

  return transferEvent
}
