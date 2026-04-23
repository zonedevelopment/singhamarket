if(NOT TARGET hermes-engine::libhermes)
add_library(hermes-engine::libhermes SHARED IMPORTED)
set_target_properties(hermes-engine::libhermes PROPERTIES
    IMPORTED_LOCATION "/Users/zone-idea/.gradle/caches/8.11.1/transforms/a46dbe7a51def451f078561a8c414b6e/transformed/jetified-hermes-android-0.77.0-debug/prefab/modules/libhermes/libs/android.x86/libhermes.so"
    INTERFACE_INCLUDE_DIRECTORIES "/Users/zone-idea/.gradle/caches/8.11.1/transforms/a46dbe7a51def451f078561a8c414b6e/transformed/jetified-hermes-android-0.77.0-debug/prefab/modules/libhermes/include"
    INTERFACE_LINK_LIBRARIES ""
)
endif()

