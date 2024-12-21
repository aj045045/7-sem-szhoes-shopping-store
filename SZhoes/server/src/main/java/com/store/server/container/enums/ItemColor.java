package com.store.server.container.enums;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

public enum ItemColor {
    SLATE,
    GRAY,
    ZINC,
    NEUTRAL,
    STONE,
    RED,
    ORANGE,
    AMBER,
    YELLOW,
    LIME,
    GREEN,
    EMERALD,
    TEAL,
    CYAN,
    SKY,
    BLUE,
    INDIGO,
    VIOLET,
    PURPLE,
    FUCHSIA,
    PINK,
    ROSE;

    public static List<String> toList() {
        return Arrays.stream(ItemColor.values())
                .map(Enum::name)
                .collect(Collectors.toList());
    }
}
