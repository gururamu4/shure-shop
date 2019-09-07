import { Product } from '../models/products'

export interface AppState {
    readonly products: Product[]
}