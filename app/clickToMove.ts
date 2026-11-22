import type { Direction, Position } from "../core/mod.ts";
import type { Controller } from "./controllers.ts";

function neighborDirection(
  player: Position,
  tile: Position,
): Direction | undefined {
  const dx = tile.x - player.x;
  const dy = tile.y - player.y;
  if (Math.abs(dx) + Math.abs(dy) !== 1) return undefined;
  if (dx !== 0) return dx > 0 ? "right" : "left";
  return dy > 0 ? "down" : "up";
}

export const clickToMove: Controller = {
  label: "Click a neighboring tile",
  attach(session, board) {
    return board.onTileClick((tile) => {
      const player = session.getState().puzzle.player;
      const direction = neighborDirection(player, tile);
      if (direction) session.dispatch({ kind: "move", direction });
    });
  },
};
