import './UniList.css';
import { useState , useEffect } from "react";
import costData from '../src/Cost.txt'

// import fileReader from './FileRead.js';


export default function CalList () {
    
    let listTitle = ['I20', 'SEVIS-FEE','DS160','VISA-INTERVIEW','TUITION','HOUSING-COST','FOOD-COST','OTHERS']
    //logo (png)
    const [logoUrl, setlogoUrl] = useState(new Map());
    //overview (paragraph)
    const [uniOverview, setuniOverview] = useState(new Map());
    // address of each university 
    const [uniLocation, setUniLocation] = useState(new Map());
    //MOST IMPORTANT DATA : list of all info
    const [list, setList] = useState(new Map());


    //for the total cost
    const [totalCost, setTotalCost] = useState(0);
    const [convertedCost, setCovCost] = useState(0);
    const [exRate, setExRate] = useState(0);
    const [curSign , setcurSign] = useState('');
    const [selectedOption, setSelectedOption] = useState('');
    // make a choose list with search option for user
    // but the thing is users have to choose only *prevent letter error
    //for displaying
    const [uniName, setUniName] = useState();
    const [checkboxNums, setcheckboxNums] = useState();
    const [listDetails, setlistDetails] = useState();
    const [logoDetails, setlogoDetails] = useState();
    const [overviewDetails, setoverviewDetails] = useState();
    const [locationDetails, setlocationDetails] = useState();

    
    //for the currency and sign
    const exchangeRate = (string) => {
        setSelectedOption(string);
        switch(string) {
            //use the web-scrapping to bring the exchange rate!
            case 'South Korea':
                setExRate(1300);
                setcurSign('https://hatscripts.github.io/circle-flags/flags/kr.svg');
                break;
            case 'China':
                setExRate(7.07);
                setcurSign('https://hatscripts.github.io/circle-flags/flags/cn.svg');
                break;
            case 'India':
                setExRate(83.22);
                setcurSign('https://hatscripts.github.io/circle-flags/flags/in.svg');
                break;
            case 'Canada':
                setExRate(1.35);
                setcurSign('https://hatscripts.github.io/circle-flags/flags/ca.svg');
                break;
            case 'Vietnam':
                setExRate(24290);
                setcurSign('https://hatscripts.github.io/circle-flags/flags/vn.svg');
                break;
            case 'Taiwan':
                setExRate(31.26);
                setcurSign('https://hatscripts.github.io/circle-flags/flags/tw.svg');
                break;
            case 'Nigeria':
                setExRate(789.00);
                setcurSign('https://hatscripts.github.io/circle-flags/flags/ng.svg');
                break;
            case 'Japan':
                setExRate(146.83);
                setcurSign('https://hatscripts.github.io/circle-flags/flags/jp.svg');
                break;
            case 'Brazil':
                setExRate(4.92);
                setcurSign('https://hatscripts.github.io/circle-flags/flags/br.svg');
                break;
            case 'Mexico':
                setExRate(17.19);   
                setcurSign('https://hatscripts.github.io/circle-flags/flags/mx.svg');
                break; 
        }
    }

    //checkbox -> university box
    const [arr, setArr] = useState([]);
    function handleChange(event) { 
        if (event.target.checked) {
            if(arr.length < 3) {
                let name = event.target.id;
                setArr(prevValues => [...prevValues,name]);
                {/**recallInfo(event.target.id);*/}
            }
        } 
        else {
            setArr(prevValues => prevValues.filter(id => id !== event.target.id));
        }
    }
    
    //file reader
    const fileRead = async (e) => {

        let lines = e.split('\n');
        let key = null;
        let tempKey = null;
        let values = [];
        let count = 0;

        /**
         <file or DB format>
         - # and Name -> 1. University of California, Irvine
         - logo (png) -> http~ .png
         - overview -> ~~~
         - get location(starts with <iframe>) -> <iframe>~~</iframe>
         - get details(leftover)

         * 1. skip the empty space
         * 2. get the name for key
         * 3. get logo png as it is
         * 4. get overview
         * 5. get location 
         * 6. get details
         */
        let flag = 2;
        for(let line of lines) //read each line
        {
            if (line.trim() == '')
                continue;   //skip the empty spot
            
            if(line.includes('.png')) {
                logoUrl.set(tempKey, line); //save url as it is
                // logoUrl.set(tempKey,line);  //save url as it is
                continue; //skip the other parts
            }
            if(flag == 1) {
                uniOverview.set(tempKey, line); // save overview
                flag = 0;
                continue;
            }
            if(flag == 0) {
                uniLocation.set(tempKey,line); //save location
                flag = 2;
                continue;
            }
            // if(line.includes('http')) {
            //     uniLocation.set(tempKey, line);
            //     continue;
            // }

            // find '.' means this is name of the university
            if (line.includes('.')) {
                key = line;
                tempKey = line;
                flag = 1;
                continue; //skips other parts
            }
            else{
                values.push(line);
                count++;
            }
            //store key and value into the map
            if(key !== null && count === 8) {
                list.set(key, values);
                //reset the key and values for next data
                key = null;
                values = [];
                count = 0;
            }
        }
    }


    //for printing all details coresponding to the user's input
    const printDetails = (userInput) => {
        //get the input, 'userInput' and find the values corresponding to that key
        //find the key that includes the userInput
        //lastly, print out all values for display
    
        // let found = false;
        let tempCost = 0;

        for (let key of list.keys()) {
            if (key.includes(userInput)) { //found the key in the map
                //store data into the detatils

                //set all data from the 'list' for printing
                //react will reset all data only used for data save.
                setlistDetails(list.get(key));
                setlogoDetails(logoUrl.get(key));
                setoverviewDetails(uniOverview.get(key));
                setlocationDetails(uniLocation.get(key));
                setUniName(key.replace(/[^a-zA-Z ]/g, ''));

                tempCost = onlyNum(list.get(key));
                // found = true;
                break; //ends the loop
            }
        }
        setTotalCost(tempCost); //save the caculated prices
        setCovCost(tempCost *exRate);

        // if (found == false) {
        //     console.log('unfound in the list');
        // }
    }

    /**return the logo url*/
    function getLogo (universityName) {
        return logoUrl.get(universityName)
    }
    function getName (uncertainName) {
        for (let key of list.keys()) {
            let lowerKey = key.toLowerCase();
            if (lowerKey.includes(uncertainName)) {
                return key;
            }
        }
        return;
    }

    //for printing details for TOP10 list - not using for now
    function printQuickDetails(userInput) {
        let found = false;
        var tempList = [''];
        for (let key of list.keys()) {
            if (key.includes(userInput)) { //found the key in the map
                //store data into the detatils
                let values = list.get(key);
                for(let i = 4; i < 7; i++){
                    tempList.push(listTitle[i],':', values[i]);
                    tempList.push(<br></br>) 
                }
                //tempCost = onlyNum(values);
                found = true;
                break; //ends the loop
            }
        }
        return(tempList)
    }

    {/** bring the file from the public folder */}
    useEffect(() => {
        fetch(costData)
          .then(response => response.text())
          .then(fileRead)
          .catch(error => console.error(error));
        }, []);
    
    //convert string and retrun a numbers
    const onlyNum = (string) => {
        let tempCost = 0;
        //caculating the all numbers in the values(=cost)
        let newCheckboxNums = []; // make a copy of checkboxNums

        for (let value of string) {
            let number = Number(value.replace(/,/g, ''));
            newCheckboxNums.push(number);
            tempCost += number;
        }
        setcheckboxNums(newCheckboxNums); // update checkboxNums

        return tempCost;
    }

    //checkbox calcuating
    const costCalculating = (event, i) => {
        let newTotalCost;
        if (event.target.checked) {
            newTotalCost = totalCost - checkboxNums[i];
        } 
        else {
            newTotalCost = totalCost + checkboxNums[i];
        }
        setTotalCost(newTotalCost);
        setCovCost(newTotalCost * exRate);
    }

    const [tempName, setTempName] = useState('');
    const [tempName2, setTempName2] = useState('');
    const onChange = (event) => {
    //    let w = getName(event.target.value);
    //    console.log(w);
       setTempName(event.target.value);
    }
    const onSearch = (searchItem) => {
      setTempName(searchItem);
      handleSelection(tempName);
    }

    const [checkingSet, setcheckSet] = useState(false);
    const [selectedCollege, setSelectedCollege] = useState(null);
    const [displayDetails, setDisplayDetails] = useState(null);

    //user clicks 'set'
    const handleSelection = (college) => {
        setSelectedCollege(college);
        setcheckSet(true); // --> checks 'set' button is selected!
    };
    const handleReset = () => {
        setSelectedCollege(null);
        setcheckSet(false); // --> reset!
        setTempName('');
        // setDisplayDetails(null); --> this will delete the detail box
    };

    //user selects the country
    const [selectedCountry, setSelectedCountry] = useState(null);
    const selectCountry = (e) => {
        exchangeRate(e.target.value);
        setSelectedCountry(e.target.value);
      };

      
    //return...
    return (
        
        <div className='box'>
            <div className='upperbox'>
                <p style={{fontSize:'1.1rem'}}>Quick Compare of TOP 7 Universities</p>
                <div className='top7University'>
                    <label className='university-label'>
                        <input type="checkbox" onChange={handleChange} id='UCI' className='checkbox' autocomplete='off'></input>
                        <img className='university-logo' src='https://brand.uci.edu/master-branding/marks/_img/uci_traditional_yel_blue_bckgrnd.png'></img>
                        <span className ='university-name'>UCI</span>
                    </label>
                    
                    <label className='university-label'>
                        <input type="checkbox" onChange={handleChange} id='UCLA' className='checkbox' autocomplete='off'></input>
                        <img className='university-logo' src='https://upload.wikimedia.org/wikipedia/commons/thumb/0/0d/The_University_of_California_UCLA.svg/204px-The_University_of_California_UCLA.svg.png'></img>
                        <span className ='university-name'>UCLA</span>
                    </label>
                    <label className='university-label'>
                        <input type="checkbox" onChange={handleChange} id='UCB' className='checkbox' autocomplete='off'></input>
                        <img className='university-logo' src='https://upload.wikimedia.org/wikipedia/commons/thumb/a/a1/Seal_of_University_of_California%2C_Berkeley.svg/2048px-Seal_of_University_of_California%2C_Berkeley.svg.png'></img>
                        <span className ='university-name'>UC, Berkely</span>
                    </label>
                    <label className='university-label'>
                        <input type="checkbox" onChange={handleChange} id='UCSD' className='checkbox' autocomplete='off'></input>
                        <img className='university-logo' src='https://upload.wikimedia.org/wikipedia/commons/1/18/UCSD_Seal.png'></img>
                        <span className ='university-name'>UC, San diego</span>
                    </label>
                    
                    <label className='university-label'>
                        <input type="checkbox" onChange={handleChange} id='UCR' className='checkbox' autocomplete='off'></input>
                        <img className='university-logo' src='https://upload.wikimedia.org/wikipedia/en/thumb/5/51/UC_Riverside_seal.svg/1024px-UC_RiversonChange={handleChange} ide_seal.svg.png'></img>
                        <span className ='university-name'>UC, Riverside</span>
                    </label> <p></p>
                    <label className='university-label'>
                        <input type="checkbox" onChange={handleChange} id='UCD' className='checkbox' autocomplete='off'></input>
                        <img className='university-logo' src='https://communicationsguide.ucdavis.edu/sites/g/files/dgvnsk6246/files/inline-images/UCDavisUnofficialSeal_2Color_0.png'></img>
                        <span className ='university-name'>UC, Davis</span>
                    </label>
                    <label className='university-label'>
                        <input type="checkbox" onChange={handleChange} id='UCSB' className='checkbox' autocomplete='off'></input>
                        <img className='university-logo' src='https://upload.wikimedia.org/wikipedia/commons/4/48/UC_Santa_Barbara_Seal.png'></img>
                        <span className ='university-name'>UC, Santa Barbara</span>
                    </label>
                </div>
                <div className='top7UniversitySelection'>
                    {arr.map((a, i) => (
                            <table className='costList' key={i}>
                                {a}
                                <p className='temp-costList'>{printQuickDetails(a)}</p>
                            </table>
                    ))}
                </div>
            </div>

            <div className='middlebox'>
                {selectedCollege == null ?
                <>
                    <div className='universitySelection'>
                    {/* <p style={{fontSize:'1.1rem'}}>Search your university</p>
                    <input className='university-inputbox' type="text" onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            printDetails(e.target.value);
                        }}}/>    */}
                    <div className='searchbox-title'>
                        <h1>Select Your University</h1>
                        <div className='search-container'>
                            <div className='search-inner'>
                                <input type='text' value={tempName.replace(/[^a-zA-Z ]/g, '')} onChange={onChange}/>
                                {/* <button onClick={() => handleSelection(tempName)}>SET!</button> */}
                            </div>
                        </div>
                        <div className='dropdown'>
                            {Array.from(list.keys()).filter(item => {
                                const searchItem = tempName.toLowerCase();
                                const universtiyName = item.toLowerCase();
                                return (searchItem && universtiyName.includes(searchItem) && universtiyName !== searchItem);
                                }).slice(0,6).map((item) => 
                                <div className='dropdown-row' onClick={() => onSearch(item)}>{item.replace(/[^a-zA-Z ]/g, '')} 
                                </div>
                            )}
                        </div>
                    </div>
                    </div>
                </>
                :
                <div className='universitySelection2'>
                    <h1>Select Your University</h1>
                    <div className='searchbox-title2'>
                        <img className='selection-logo' src = {getLogo(tempName)}></img><span>{tempName.replace(/[^a-zA-Z ]/g, '')}</span>
                        <button className='universitySel-reset' onClick={handleReset}>X</button>
                    </div>
                </div>
                }
                
                {/** country option for exchange rate */}
                <div className='countrySelection'>   
                    <h1>Choose Your Country</h1>
                    <div className='flags'>
                    {
                        selectedCountry == null ?
                        <>
                            <button value="South Korea" onClick={selectCountry}><img src='https://hatscripts.github.io/circle-flags/flags/kr.svg'></img>South Korea</button>
                            <button value="China" onClick={selectCountry}><img src='https://hatscripts.github.io/circle-flags/flags/cn.svg'></img>China</button>
                            <button value="India" onClick={selectCountry}><img src='https://hatscripts.github.io/circle-flags/flags/in.svg'></img>India</button>
                            <button value="Canada" onClick={selectCountry}><img src='https://hatscripts.github.io/circle-flags/flags/ca.svg'></img>Canada</button>
                            <button value="Vietnam" onClick={selectCountry}><img src='https://hatscripts.github.io/circle-flags/flags/vn.svg'></img>Vietnam</button>
                            <button value="Taiwan" onClick={selectCountry}><img src='https://hatscripts.github.io/circle-flags/flags/tw.svg'></img>Taiwan</button>
                            <button value="Nigeria" onClick={selectCountry}><img src='https://hatscripts.github.io/circle-flags/flags/ng.svg'></img>Nigeria</button>
                            <button value="Japan" onClick={selectCountry}><img src='https://hatscripts.github.io/circle-flags/flags/jp.svg'></img>Japan</button>
                            <button value="Brazil" onClick={selectCountry}><img src='https://hatscripts.github.io/circle-flags/flags/br.svg'></img>Brazil</button>
                            <button value="Mexico" onClick={selectCountry}><img src='https://hatscripts.github.io/circle-flags/flags/mx.svg'></img>Mexico</button>
                        
                        </>
                        :
                        <button className onClick={()=>setSelectedCountry(null)}><img src={curSign}></img>{selectedCountry}</button>
                    }
                    </div>
                </div>
                
                {/** calculate button */}
                <div className='calculating-button-container'>
                    <button className='initialing-button' onClick={() => {
                        if(checkingSet == true){
                            printDetails(tempName)
                            setDisplayDetails('selected')
                        }
                        else {
                            alert('Select University')
                        }}}>Calculate</button>
                </div>                
            </div>
            {/* This section is for corresponding section on the user */}
            <div className='lowerbox'>
                {
                displayDetails == null ?
                <>
                </>
                :
                <div className='university-detailcontainer'> 
                        <div className='header-listBox'>
                            <div className='header-logo-container'>
                                <img className='university-header-logo' src = {logoDetails}></img>
                            </div>
                            <div className='header-name-container'>
                                <h5 className='university-header-name'>{uniName}<br></br>
                                    <p className='header-name-details'>
                                    <br></br><img style={{width:'1rem'}} src = 'https://static-00.iconduck.com/assets.00/location-indicator-emoji-1342x2048-a9ylqoi1.png'></img> {locationDetails}</p> 
                                </h5>
                            </div>
                        </div>

                        <div className='listBox-receipt-with-map'>
                            <div className='listBox'>   
                                <div id="receipt">
                                <div id="mid">
                                    <div className="info" >
                                        <h2 style={{fontSize:'1.4em', marginBottom:'0.5px'}}>Tuition Receipt</h2><span>Per Year</span>
                                        <p>*click the checkbox to adjust the totoal cost!</p>
                                    </div>
                                </div>
                    
                                <div id="bot">
                                <div id="table" >
                                    <table>
                                    <tr className="cost-header">
                                        <td className="list"><h2>Description</h2></td>
                                        <td></td>
                                        <td className='cost'><h2>Amount</h2></td>
                                    </tr>
                                    {listDetails.map((a,i) => (
                                        <tr className="tablebox">
                                            <td>
                                                <p className="itemtext"><input className='listcheckbox' type='checkbox' onChange={(e) => {costCalculating(e, i)}}autocomplete='off'></input>{listTitle[i]}</p>
                                            </td>
                                            <td className="tableitem"><p className="itemtext" style={{textAlign:'right'}}>$</p></td>
                                            <td className="tableitem"><p className="itemtext">{a}</p></td>
                                        </tr>
                                    ))}
                                    </table>  
                                </div>
                                </div>
                                <div className='totalcostbox'>
                                    <br></br>
                                    <div className='field'>Total Cost<span>$ {totalCost}</span></div>
                                    <div className='field-grand-total'>Converted Total <span><img src={curSign}></img>{Math.round(convertedCost*100)/100}{}</span></div> 
                                </div>
                                </div>
                            </div>
                            <div className='overview-rank-box'>
                                <div className='overview-container'>
                                    <h1>Overview</h1>
                                        <p>{overviewDetails}</p>
                                </div>
                                <div className='rank-container'>
                                    <p>university ranking</p>
                                    
                                </div>
                                {/* <div className='map-container'>
                                    <iframe src={UCI} style={{border:"0"}} allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                                </div> */}
                            </div>
                        </div>
                </div>
                }
            </div>
        </div>
    )
  }