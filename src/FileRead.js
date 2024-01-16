import { useState, useEffect } from "react";

const FileReader = () => {
    const [list, setList] = useState(new Map());
    //const [logoUrl, setLogoUrl] = useState(new Map());
    
    {/**file reader */}
    const fileRead = async (e) => {
        let lines = e.split('\n');
        let key = null;
        let tempKey = null;
        let values = [];
        //remove all emtpy spot in text
        for(let line of lines) //read each line
        {   
            //skip the empty spot
            if (line.trim() == '') {
                continue;
            }
            //save url as it is
            if(line.includes('.png')) {
                //logoUrl.set(tempKey,line);
                continue;
            }
            line = line.replace('-','');
            // find '.' means this is name of the university
            if (line.includes('.')) {
                key = line;
                tempKey = line;
            }
            else{
                values.push(line);
            }
            //store key and value into the map
            if(key !== null) {
                list.set(key, values);
                //reset the key and values for next data
                key = null;
                values = [];
            }
        }
    }

    {/** bring the file from the public folder */}
    useEffect(() => {
        fetch('/Cost.txt')
          .then(response => response.text())
          .then(fileRead)
          .catch(error => console.error(error));
        }, []);
    return {list};
}

export default FileReader;