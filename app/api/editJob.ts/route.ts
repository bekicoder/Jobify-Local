if(editId){
      values.push(editId);
      const {rows:updatedJob}:{[key:string]:number} =await db.query("update jobs set flag=$1,created_at = now(),salary_range=$2,posted_by=$3 where id=$4 RETURNING enJobid,frJobid,arJobid,ahJobid")
      languages.map(async lng=>{
        const titleKey = `title${lng}`;
      const detailKey = `detail${lng}`;
      const idKey = `${lng}Jobid`
        const values = [
      fd.location,
      fd.jobtype,
      fd.catagory,
      jobData[detailKey],
      jobData[titleKey],
      updatedJob[idKey]
    ];
        const { rows } = await db.query(`update jobTranslations set location = $1,jobtype = $2,catagory=$3,detail=$4,title=$5, where id=$6 RETURNING id,location,jobtype,catagory,detail,title;`, values);
      })
    return NextResponse.json(
      { data: rows[0], status: "successful" },
      { status: 200 },
    );
     }