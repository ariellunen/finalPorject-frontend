import React, { useState, useEffect } from 'react';
import "react-modern-calendar-datepicker/lib/DatePicker.css";
import DatePicker from "react-modern-calendar-datepicker";
import Cards from '../component/Cards';
import Box from '@mui/material/Box';
import NavLink from '../../user/components/NavLinks';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import ReplayIcon from '@mui/icons-material/Replay';
import { InputBase } from '@mui/material';
import AutoSearch from '../component/AutoSearch'
const myCustomLocale = {
    // months list by order
    months: [
        'ינואר',
        'פברואר',
        'מרץ',
        'אפריל',
        'מאי',
        'יוני',
        'יולי',
        'אוגוסט',
        'ספטמבר',
        'אוקטובר',
        'נובמבר',
        'דצמבר',
    ],

    // week days by order
    weekDays: [
        {
            name: 'Sunday', // used for accessibility 
            short: 'ראשון', // displayed at the top of days' rows
        },
        {
            name: 'Monday',
            short: 'שני',
        },
        {
            name: 'Tuesday',
            short: 'שלישי',
        },
        {
            name: 'Wednesday',
            short: 'רביעי',
        },
        {
            name: 'Thursday',
            short: 'חמישי',
        },
        {
            name: 'Friday',
            short: 'שישי',
            isWeekend: true, // is it a formal weekend or not?

        },
        {
            name: 'Saturday',
            short: 'שבת',
            isWeekend: true,
        },
    ],

    // just play around with this number between 0 and 6
    weekStartingIndex: 0,

    // return a { year: number, month: number, day: number } object
    getToday(gregorainTodayObject) {
        return gregorainTodayObject;
    },

    // return a native JavaScript date here
    toNativeDate(date) {
        return new Date(date.year, date.month - 1, date.day);
    },

    // return a number for date's month length
    getMonthLength(date) {
        return new Date(date.year, date.month, 0).getDate();
    },

    // return a transformed digit to your locale
    transformDigit(digit) {
        return digit;
    },

    // texts in the date picker
    nextMonth: 'Next Month',
    previousMonth: 'Previous Month',
    openMonthSelector: 'Open Month Selector',
    openYearSelector: 'Open Year Selector',
    closeMonthSelector: 'Close Month Selector',
    closeYearSelector: 'Close Year Selector',
    defaultPlaceholder: 'Select...',

    // for input range value
    from: 'to',
    to: 'from',

    // used for input value when multi dates are selected
    digitSeparator: ',',

    // if your provide -2 for example, year will be 2 digited
    yearLetterSkip: 0,

    // is your language rtl or ltr?
    isRtl: true,
}


let filterArr = [];
let shapes = [];
let filterShape = [];
let search = [];
export default function AllDraw() {
    const [state, setState] = useState({ left: false });
    const [isReady, setIsReady] = useState(false);
    const [data, setData] = useState(false);
    const [selectedDayRange, setSelectedDayRange] = useState({
        from: null,
        to: null
    });
    const [allKide, setAllKide] = useState([]);

    useEffect(() => {
        const getDraw = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/drawing/', {
                });
                const responseData = await response.json();
                console.log(responseData)
                setData(responseData.drawing);
            } catch (err) {
                console.log(err);
            }
            try {
                const response = await fetch('http://localhost:3000/api/users/children/', {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                const responseData = await response.json();
                setAllKide(responseData.children)
                setIsReady(true);
                console.log(responseData.children)
            } catch (err) {
                console.log(err);
            }
        }
        getDraw();
    }, [isReady]);

    const [results, setResults] = useState(false);
    const toggleDrawer = (anchor, open) => (event) => {
        if (event.target.tagName === 'BUTTON') {
            setState({ ...state, [anchor]: open });
            if ((selectedDayRange.from !== null && selectedDayRange.to !== null) || (heart !== 'outline') || (circle !== 'outline') || (home !== 'outline') || (triangular !== 'outline') || (david !== 'outline')) {
                handleFilter();
            }
        }
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setState({ ...state, [anchor]: open });
    };

    const [heart, setHeart] = useState('outlined');
    const [circle, setCircle] = useState('outlined');
    const [home, setHome] = useState('outlined');
    const [triangular, setTriangle] = useState('outlined');
    const [david, setMagen] = useState('outlined');

    const empty = arr => arr.length = 0;
    const handleFilter = () => {
        let dateStart;
        let dateEnd;
        empty(filterShape)
        empty(filterArr)
        empty(shapes)
        setResults(true)
        if (heart === 'contained') { shapes.push('heart') }
        if (circle === 'contained') { shapes.push('circle') }
        if (home === 'contained') { shapes.push('home') }
        if (triangular === 'contained') { shapes.push('triangular') }
        if (david === 'contained') { shapes.push('david') }

        if (selectedDayRange.from !== null && selectedDayRange.to !== null) {
            if (selectedDayRange.from.month.toString().length === 1 && selectedDayRange.from.day.toString().length === 1) {
                dateStart = selectedDayRange.from.year + '-0' + selectedDayRange.from.month + '-0' + selectedDayRange.from.day
            }
            else if (selectedDayRange.from.month.toString().length === 1 && selectedDayRange.from.day.toString().length === 2) {
                dateStart = selectedDayRange.from.year + '-0' + selectedDayRange.from.month + '-' + selectedDayRange.from.day
            }
            else if (selectedDayRange.from.month.toString().length === 2 && selectedDayRange.from.day.toString().length === 1) {
                dateStart = selectedDayRange.from.year + '-' + selectedDayRange.from.month + '-0' + selectedDayRange.from.day
            }
            else {
                dateStart = selectedDayRange.from.year + '-' + selectedDayRange.from.month + '-' + selectedDayRange.from.day
            }

            if (selectedDayRange.to.month.toString().length === 1 && selectedDayRange.to.day.toString().length === 1) {
                dateEnd = selectedDayRange.to.year + '-0' + selectedDayRange.to.month + '-0' + selectedDayRange.to.day
            }
            else if (selectedDayRange.to.month.toString().length === 1 && selectedDayRange.to.day.toString().length === 2) {
                dateEnd = selectedDayRange.to.year + '-0' + selectedDayRange.to.month + '-' + selectedDayRange.to.day
            }
            else if (selectedDayRange.to.month.toString().length === 2 && selectedDayRange.to.day.toString().length === 1) {
                dateEnd = selectedDayRange.to.year + '-' + selectedDayRange.to.month + '-0' + selectedDayRange.to.day
            }
            else {
                dateEnd = selectedDayRange.to.year + '-' + selectedDayRange.to.month + '-' + selectedDayRange.to.day
            }

            data.forEach(draww => {
                let draw1 = draww.timeStarted.slice(0, 10);
                let draw = draw1;
                if (dateStart.slice(0, 4) <= draw.slice(0, 4) && draw1.slice(0, 4) <= dateEnd.slice(0, 4)) {
                    if (dateStart.slice(5, -3) <= draw.slice(5, -3) && draw1.slice(5, -3) <= dateEnd.slice(5, -3)) {
                        if (dateStart.slice(8) <= draw.slice(8) && draw1.slice(8) <= dateEnd.slice(8)) {
                            filterArr.push(draww)
                        }
                    }
                }

            });
        }

        if (shapes.length !== 0 && selectedDayRange.from !== null && selectedDayRange.to !== null) {
            for (let i = 0; i < filterArr.length; i++) {
                for (let j = 0; j < shapes.length; j++) {
                    if (filterArr[i].shape === shapes[j]) {
                        filterShape.push(filterArr[i])
                    }
                }
            }
        }

        if (shapes.length !== 0 && selectedDayRange.from === null && selectedDayRange.to === null) {
            for (let i = 0; i < data.length; i++) {
                for (let j = 0; j < shapes.length; j++) {
                    if (data[i].shape === shapes[j]) {
                        console.log('im here')
                        filterShape.push(data[i])
                    }
                }
            }
        }

        if (shapes.length === 0 && selectedDayRange.from !== null && selectedDayRange.to !== null) {
            filterShape = filterArr;
        }

        console.log(filterShape);
    }

    const handleHeart = (e) => {
        if (heart === 'outlined') { setHeart('contained'); }
        else { setHeart('outlined'); }
    }

    const handleCircle = (e) => {
        if (circle === 'outlined') { setCircle('contained'); }
        else { setCircle('outlined'); }
    }

    const handleHome = (e) => {
        if (home === 'outlined') { setHome('contained'); }
        else { setHome('outlined'); }
    }

    const handleMagen = (e) => {
        if (david === 'outlined') { setMagen('contained'); }
        else { setMagen('outlined'); }
    }

    const handletriangle = (e) => {
        if (triangular === 'outlined') { setTriangle('contained'); }
        else { setTriangle('outlined'); }
    }


    const list = (anchor) => (
        <Box
            sx={{ width: 350 }}
            role="presentation"
        >
            <List>
                <ListItem>
                    <DatePicker
                        value={selectedDayRange}
                        onChange={setSelectedDayRange}
                        inputPlaceholder="בחר טווח תאריכים"
                        shouldHighlightWeekends
                        locale={myCustomLocale} // custom locale object
                    />
                </ListItem>
                <Button onClick={() => { setSelectedDayRange({ from: null, to: null }) }}>איפוס תאריכים</Button>
                <Divider />
                <ListItem>
                    <ListItemText>צורה</ListItemText>

                </ListItem>
                <ListItem>
                    <Button variant={heart} onClick={handleHeart}>לב</Button>
                    <Button variant={home} onClick={handleHome}>בית</Button>
                    <Button variant={circle} onClick={handleCircle}>עיגול</Button>
                    <Button variant={david} onClick={handleMagen}>מגן דוד</Button>
                    <Button variant={triangular} onClick={handletriangle}>משולש</Button>
                </ListItem>
            </List>
            <Divider />
            <List>
                {['All mail', 'Trash', 'Spam'].map((text, index) => (
                    <ListItem key={text} disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                            </ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
            <Button variant='contained' onClick={toggleDrawer(anchor, false)}>שמירה</Button>
        </Box>
    );

    const [text, setText] = useState('אברהם');
    const handleText = (e) => {
        // setText(e.target.value)
        console.log(text)
    }

    let findDuplicates = arr => arr.filter((item, index) => arr.indexOf(item) != index)

    const searchText = (firstKide) => {
        search.push(firstKide.id)
        console.log(search)
    }

    const checkDrawing = (e) => {
        e.preventdefault()
        setResults(true)
        console.log([...new Set(findDuplicates(search))])
        console.log(search)
        for (let index = 0; index < data.length; index++) {
            for (let j = 0; j < search.length; j++) {
                if (data[index].id === search[j]) {
                    filterArr.push(data[index])
                }
            }
            console.log(filterArr)
        }
    }

    const [value, setValue] = useState(null)

    const handleValue = (value) => {
        setValue(value)
    }

    const handleTextChanage = (value) => {
        setTextChange(value)
    }

    
    const [textChange, setTextChange] = useState(null)
    console.log(value, textChange)
    return (
        <div>
            <NavLink />
            <Paper
                component="form"
                sx={{ display: 'flex', alignItems: 'center' }}
            >
              <AutoSearch value={value} handleValue={handleValue} allKide={allKide} handleTextChanage={handleTextChanage}/>
                <IconButton type="submit" sx={{ p: '10px' }} aria-label="search" onClick={checkDrawing}>
                    <SearchIcon />
                </IconButton>
                {['left'].map((anchor) => (
                    <React.Fragment key={anchor}>
                        <IconButton color="primary" sx={{ p: '10px' }} aria-label="directions" onClick={toggleDrawer(anchor, true)}>
                            <MoreVertIcon />
                        </IconButton>
                        <Drawer
                            anchor={anchor}
                            open={state[anchor]}
                            onClose={toggleDrawer(anchor, false)}
                        >
                            {list(anchor)}
                        </Drawer>
                        <InputBase id="outlined-basic" onChange={handleText} />

                    </React.Fragment>
                ))}
            </Paper>
            <Box sx={{ flexWrap: 'wrap', justifyContent: 'center', display: 'flex', flexWrap: 'wrap' }}>
                {/* {(filterShape?.length !== 0 || shapes?.length !== 0)  && filterShape.map((item, key) => {
                    return (
                        <Box sx={{
                            justifyContent: 'center',
                            p: 1,
                            m: 1,
                            bgcolor: 'background.paper',
                            borderRadius: 1,
                            width: '25%',
                        }}>
                            <Cards item={item} key={key} index={key} searchText={searchText} text={text} />
                        </Box>
                    )
                })}

                {(filterShape?.length === 0)  && <Box sx={{
                    justifyContent: 'center',
                    p: 1,
                    m: 1,
                    bgcolor: 'background.paper',
                    borderRadius: 1,
                    width: '25%',
                }}>
                    No results were found
                    <IconButton>
                        טעינה מחדש
                        <ReplayIcon fill={'black'} onClick={() => setResults(false)} sx={{ height: '30px', width: '30px' }} />
                    </IconButton>
                </Box>
                } */}

                {isReady && data.map((item, key) => {
                    return (
                        <Box sx={{
                            justifyContent: 'center',
                            p: 1,
                            m: 1,
                            bgcolor: 'background.paper',
                            borderRadius: 1,
                            width: '25%',
                        }}>
                            <Cards item={item} key={key} index={key} searchText={searchText} text={text} />
                        </Box>
                    )
                })}
            </Box>
        </div>
    );
}