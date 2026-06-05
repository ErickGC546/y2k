# Arreglar error 400 en checkout

## Causa raíz
La edge function `create-checkout` valida que cada `item.id` sea un UUID válido y luego consulta `products` por ese id para verificar precio y stock. En el frontend, el tipo `Product` declara `id: number`, así que en `ProductCard.tsx` y `ProductPage.tsx` se hace `parseInt(uuid) || Date.now()`. Como un UUID no es numérico, `parseInt` devuelve `NaN` y se guarda `Date.now()` en el carrito. Al hacer checkout, el id no es UUID → la función responde 400 ("ID de producto inválido").

## Cambios (solo frontend, sin tocar la edge function)

1. **`src/types/product.ts`**
   - Cambiar `Product.id` de `number` a `string` (UUID).

2. **`src/contexts/CartContext.tsx`**
   - Cambiar las firmas que usan `productId: number` a `productId: string` (`removeFromCart`, `updateQuantity`) y los `find`/`filter`/`map` correspondientes.

3. **`src/components/ProductCard.tsx`**
   - Quitar `parseInt(id) || Date.now()`. Pasar el `id` (UUID string) directamente al objeto `Product`.

4. **`src/pages/ProductPage.tsx`**
   - Quitar `parseInt(product.id) || Date.now()`. Usar `product.id` (UUID string) tal cual al construir el objeto para `addToCart`.

5. **Componentes del carrito que consumen el id** (`src/components/cart/CartItem.tsx`, `src/components/cart/CartItemList.tsx`)
   - Ajustar tipos de props/handlers de `number` a `string` donde se pase `productId`. Sin cambios visuales.

6. **Cualquier otro lugar que llame `removeFromCart`/`updateQuantity` con `number`**
   - Verificar y actualizar (búsqueda rápida en `src/`).

## Notas
- El carrito guardado en `localStorage` con ids numéricos antiguos quedará obsoleto; al primer checkout el usuario debe vaciar/recargar el carrito. Opcional: limpiar entradas cuyo `id` no sea string al cargar desde `localStorage`.
- No se modifica la edge function ni la base de datos: el contrato (UUIDs) ya es correcto del lado del servidor.

## Verificación
- Añadir un producto al carrito → en DevTools, `localStorage.cart` debe contener el UUID real.
- Click en "Proceder al pago" → la request a `create-checkout` debe devolver 200 con `url` de Mercado Pago.
