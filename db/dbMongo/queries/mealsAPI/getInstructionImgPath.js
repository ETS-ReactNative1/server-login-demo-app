exports.getInstructionImgPath = (req, res) =>{

  const url = req.protocol + '://' + req.get('host')

  const img_path = [];
  for(var i=0; i<req.files.length; i++){
    img_path.push(url+"/instruction/" + req.files[i].filename);
  }
  res.send({ instrutionImg_paths: img_path });
//   res.status(200).send(JSON.stringify({ msg: 'Succesfully send to meal table.', done: true }))
};
