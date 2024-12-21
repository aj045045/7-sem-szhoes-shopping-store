package com.store.server.container.enums;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

/*  
This Java code defines an enum called `CategoryTag` which represents different categories such as
MEN, WOMEN, KIDS, ACCESSORIES, and COLLECTIONS.
*/
public enum CategoryTag {
    MEN,
    WOMEN,
    KIDS,
    ACCESSORIES,
    COLLECTIONS;

    public static List<String> toList() {
        return Arrays.stream(CategoryTag.values())
                .map(Enum::name)
                .collect(Collectors.toList());
    }
}
