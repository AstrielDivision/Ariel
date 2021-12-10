import { FT } from '../../Utils'

export const Language = FT<{ parameter: string }>('arguments:language')
export const nanoID = FT<{ parameter: string }>('arguments:nanoID')
export const Piece = FT<{ parameter: string; piece: string }>('arguments:piece')
