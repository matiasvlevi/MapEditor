setTimeout(() => {
  let fileinput = document.getElementById('loadMap');

  fileinput.addEventListener('change', function() {
    var file = fileinput.files[0];

    if (file.name.match(/\.(json)$/)) {
      var reader = new FileReader();

      reader.onload = function() {
        console.log(reader.result);
        grid.values = JSON.parse(reader.result).blocks;
      };

      reader.readAsText(file);
    } else {
      alert("File not supported, .json files only");
    }
  });
}, 1);