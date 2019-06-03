const express = require('express');
const app = express();

const recorder = require('screen-capture-recorder');
const scene    = new recorder({ x:0, y:0, w:1366, h:768 });
// const ejs = require('ejs');
const mkdirp = require('mkdirp');

// app.set('view engine','ejs');

// app.get('/',(res,req) =>{
//    res.render('index');
// });

// app.listen(3000);
// })

mkdirp('C:/record', function(err) { 
   console.log(err)
});

scene.warmup(function(err){
  //recorder is ready, now start capture
  scene.StartRecord(function(err){
    if(err)
      console.log("Something got wrong");
    //capture start _very_ quicky (60ms)
  });

  setTimeout(function(){
    scene.once(recorder.EVENT_DONE, function(err, tmp_path) {
      if(!err)
        console.log("c:/record/record.ogg");
      //tmp_path is a temporary file that will be deleted on process exit, keep it by renaming it
      require('fs').renameSync(tmp_path, "C:/record/" + "record.ogg");
      // path.basename('C:\\'+tmp_path);
    });

    scene.StopRecord(function(err){
      if(err)
        console.log("Something got wrong");
    });
  }, 1000 * 10);
});
