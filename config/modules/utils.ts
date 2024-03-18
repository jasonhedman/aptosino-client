import {
    EntryFunctionArgumentTypes,
    InputEntryFunctionData,
    InputViewRequestData,
    MoveStructId,
    MoveValue, Network,
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
    args: Array<SimpleEntryFunctionArgumentTypes> | Array<EntryFunctionArgumentTypes>,
    typeArgs?: Array<MoveStructId>
): InputEntryFunctionData => ({
    function: func,
    typeArguments: typeArgs,
    functionArguments: args,
})