function lerp(A,B,t) {
    // t is a percentage between the start point A and endpoint B
    // if t = 0; evaluates to A - first lane marking
    // if t = 1, evaluates to B - last lane marking
    // anything in between is your extra markings for multiple lanes
    return (A + (B-A) * t);
}

// getIntersection - watch the vid on how he defines it

function getIntersection(A, B, C, D) {
    const tTop = (D.x - C.x) * (A.y - C.y) - (D.y - C.y) * (A.x - C.x);
    const uTop = (C.y - A.y) * (A.x - B.x) - (C.x - A.x) * (A.y - B.y);
    const bottom = (D.y - C.y) * (B.x - A.x) - (D.x - C.x) * (B.y - A.y);

    if (bottom != 0) {
        const t = tTop / bottom;
        const u = uTop / bottom;
        if (t >= 0 && t <=1 && u >=0 && u <=1) {
            return {
                x: lerp(A.x, B.x, t),
                y: lerp(A.y, B.y, t),
                offset: t
            }
        }
    }

    return null;
}

function polysIntersect(poly1, poly2) {
    for (let i = 0; i < poly1.length; i++) {
        for (let j = 0; j < poly2.length; j++) {
            const touch = getIntersection(
                poly1[i],
                poly1[(i+1)%poly1.length],
                // ^ above line, for a 4 sided polygon points are p0,p1,p2,p3
                // i + 1 modulo length will give p0 which is great as p3 connects back to p0
                // without it, just doing i + 1 we get an error anyway.
                poly2[j],
                poly2[(j+1)%poly2.length]
            );
            if (touch) {
                return true;
            }
        }
    }
    return false;
}

function getRGBA(value) {
    const alpha = Math.abs(value);
    const R = value < 0 ? 0 : 255;
    const G = R;
    const B = value > 0 ? 0 : 255;
    return "rgba("+R+", "+G+", "+B+","+alpha+")";
}

function getRandomColor() {
    const hue = 290 + Math.random() * 260;
    return "hsl("+hue+", 100%, 60%)";
}

// hue, saturation, lightness (HSL) and 290 + random between 260 misses out blue hues because our car is default blue