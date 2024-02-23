import {
    InputEntryFunctionData,
    InputViewRequestData,
    MoveStructId,
    MoveValue,
    SimpleEntryFunctionArgumentTypes
} from "@aptos-labs/ts-sdk";

export const viewPayload = (
    func: MoveStructId,
    typeArgs?: Array<MoveStructId>,
    args?: Array<MoveValue>
): InputViewRequestData => ({
    function: func,
    typeArguments: typeArgs,
    functionArguments: args
})

export const entryFunctionPayload = (
    func: MoveStructId,
    args: Array<SimpleEntryFunctionArgumentTypes>,
    typeArgs?: Array<MoveStructId>
): InputEntryFunctionData => ({
    function: func,
    typeArguments: typeArgs,
    functionArguments: args,
})