package com.store.server.container.enums;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

public enum ItemSize {
    SIZE_3(3),
    SIZE_4(4),
    SIZE_5(5),
    SIZE_6(6),
    SIZE_7(7),
    SIZE_8(8),
    SIZE_9(9),
    SIZE_10(10),
    SIZE_11(11);

    private final int size;

    ItemSize(int size) {
        this.size = size;
    }

    public int getSize() {
        return size;
    }

    public ItemSize setSize(int size) {
        return ItemSize.valueOf("SIZE_" + Integer.toString(size));
    }

    public static List<String> toList() {
        return Arrays.stream(ItemSize.values())
                .map(Enum::name)
                .collect(Collectors.toList());
    }
}
