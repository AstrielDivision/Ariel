import { FT, T } from '../../Utils'

export const ClientPermissions = FT<{ missing: string[] }>('preconditions:clientPermissions')
export const UserPermissions = FT<{ missing: string[] }>('preconditions:userPermissions')

export const Nsfw = T('preconditions:nsfw')
export const Admin = T('preconditions:admin')
export const Manager = T('preconditions:manager')
export const Mod = T('preconditions:mod')
export const OwnerOnly = T('preconditions:ownerOnly')
