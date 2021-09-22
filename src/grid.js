class Grid {
  constructor(x, y, w, h, nbx, nby) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.nbx = nbx;
    this.nby = nby;
    this.values = [];
    this.t = 0;
    this.clickedCount = 0;
    this.drawType = 'wall';
    this.delete = false;
  }
  setDrawType(type) {
    this.drawType = type;
  }
  addBlock(x, y, type = 'wall') {
    let count = 0;
    for (let i = 0; i < this.values.length; i++) {
      if (this.values[i].x === x && this.values[i].y === y) {
        count++;
      }
    }
    if (count === 0) {
      this.values.push({
        x,
        y,
        type
      });
      console.log(this.values[this.values.length - 1]);
    } else {
      console.log('block present at ' + x + ',' + y);
    }

  }
  deleteBlock(x, y) {
    let count = 0;
    for (let i = 0; i < this.values.length; i++) {
      if (this.values[i].x === x && this.values[i].y === y) {
        count++;
      }
    }
    if (count !== 0) {
      let index = this.values.findIndex(block => {
        return block.x === x && block.y === y;
      })
      this.values.splice(index, 1);
    }

  }
  toggleDelete() {

    this.delete = !this.delete;
    document.getElementById('deletebutton').textContent = 'Erase: ' + this.delete;
  }
  render(tick) {
    for (let i = 0; i < this.nbx; i++) {
      for (let j = 0; j < this.nby; j++) {
        let type = 'wall';
        let isPresent = this.values.find(block => {
          type = block.type;
          return block.x === i && block.y === j;
        })

        if (
          mouseX > (i * this.w) + this.x &&
          mouseX < ((i + 1) * this.w) + this.x &&
          mouseY > (j * this.h) + this.y &&
          mouseY < ((j + 1) * this.h) + this.y
        ) {

          if (mouseIsPressed && this.clickedCount === 0) {
            if (!this.delete) {
              this.addBlock(i, j, this.drawType);
            } else {
              this.deleteBlock(i, j);
            }
            this.clickedCount++;
          }

          fill(0, 100);
        } else if (isPresent) {

          fill.apply(null, COLOR_CODES[type])
        } else {
          noFill();
        }
        rect(
          i * this.w + this.x,
          j * this.h + this.y,
          this.w,
          this.h
        );
      }
    }
    let t = 1;
    if (tick >= this.t + t) {
      this.t = this.t + t;
      this.clickedCount = 0;
    }
  }
  save(exportName = 'map') {
    var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify({ blocks: this.values }));
    var downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", exportName + ".json");
    document.body.appendChild(downloadAnchorNode); // required for firefox
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  }

}