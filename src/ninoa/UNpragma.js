
export default function createUN(thing, props, ...children){
    let finalProps =  props != null ? props : {}; // if props is null, use an empty object instead.
    finalProps.children = children;
    return thing(finalProps);
}



