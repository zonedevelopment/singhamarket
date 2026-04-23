if(NOT TARGET fbjni::fbjni)
add_library(fbjni::fbjni SHARED IMPORTED)
set_target_properties(fbjni::fbjni PROPERTIES
    IMPORTED_LOCATION "/Users/zone-idea/.gradle/caches/8.11.1/transforms/24635d1f7c9b630dbb5d636b999f2392/transformed/jetified-fbjni-0.7.0/prefab/modules/fbjni/libs/android.x86/libfbjni.so"
    INTERFACE_INCLUDE_DIRECTORIES "/Users/zone-idea/.gradle/caches/8.11.1/transforms/24635d1f7c9b630dbb5d636b999f2392/transformed/jetified-fbjni-0.7.0/prefab/modules/fbjni/include"
    INTERFACE_LINK_LIBRARIES ""
)
endif()

