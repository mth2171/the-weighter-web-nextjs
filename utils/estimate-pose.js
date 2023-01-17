export function getKeypointsObject(pose) {
  return pose.keypoints.reduce((acc, { part, position, score }) => {
    position["score"] = score;
    acc[part] = position;
    return { ...acc };
  }, {});
}

export function getAngle (x1, y1, x2, y2) {
  const rad = Math.atan2(y2 - y1, x2 - x1);
  return 1 * ((rad * 180) / Math.PI);
}