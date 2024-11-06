<?php

namespace app\Transformers;

use Illuminate\Database\Eloquent\Collection;

abstract class BaseTransformer
{
    /**
     * Base transform method.
     *
     * @param mixed $item
     * @param bool $extended
     * @return array
     */
    public function transform(mixed $item, bool $extended = false): array
    {
        // method to be overwritten by user
        return [];
    }

    /**
     * Transform a single item.
     *
     * @param mixed $item
     * @param bool $extended
     * @return array|null
     */
    public function transformItem(mixed $item, bool $extended = false): ?array
    {
        // Delegate to the transform method for implementation
        return $item ? $this->transform($item, $extended) : null;
    }

    /**
     * Transform a collection of items.
     *
     * @param Collection $items
     * @param bool $extended
     * @return array
     */
    public function transformItems(Collection|array $items, bool $extended = false): array
    {
        // Use map to transform each item in the collection
        $data = [];
        foreach ($items as $item) {
            $data[] = $this->transformItem($item, $extended);
        }
        return $data;
    }
}
