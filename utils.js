function lerp(A,B,t) {
    // t is a percentage between the start point A and endpoint B
    // if t = 0; evaluates to A - first lane marking
    // if t = 1, evaluates to B - last lane marking
    // anything in between is your extra markings for multiple lanes
    return (A + (B-A) * t);
}