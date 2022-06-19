import React, { useState, useEffect } from 'react';
import "react-modern-calendar-datepicker/lib/DatePicker.css";
import DatePicker from "react-modern-calendar-datepicker";
import Cards from '../component/Cards';
import Box from '@mui/material/Box';
import NavLink from '../../user/components/NavLinks';
import IconButton from '@mui/material/IconButton';
import Divider from '@mui/material/Divider';
import CircularProgress from '@mui/material/CircularProgress';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import AutoSearch from '../component/AutoSearch'
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import SortIcon from '@mui/icons-material/Sort';
import { Link } from 'react-router-dom';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Breadcrumbs from '@mui/material/Breadcrumbs';
let kid1;
let kid2;


const myCustomLocale = {
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

export default function AllDraw() {
    const breadcrumbs = [
        <Typography key="1" color="text.primary" component={Link} to='/'>
            תפריט ראשי
        </Typography>,
        <Typography key="2" color="text.primary">
            כל הציורים
        </Typography>,
    ];
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
                const response = await fetch(`${process.env.REACT_APP_BECKEND_URL}/drawing/`, {
                });
                const responseData = await response.json();
                setData(responseData.drawing.reverse());
            } catch (err) {
                console.log(err);
            }
            try {
                const response = await fetch(`${process.env.REACT_APP_BECKEND_URL}/users/children/`, {
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

    const toggleDrawer = (anchor, open) => (event) => {
        if (event.target.tagName === 'BUTTON') {
            setState({ ...state, [anchor]: open });
            if ((selectedDayRange.from !== null && selectedDayRange.to !== null) || (heart !== 'outline') || (circle !== 'outline') || (home !== 'outline') || (triangular !== 'outline') || (david !== 'outline')) {
                // handleFilter();
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

    const [age, setAge] = React.useState('');

    const handleChange = (event) => {
        setAge(event.target.value);
    };
    const list = (anchor) => (
        <Box
            sx={{ width: 350, textAlignLast: 'center' }}
            role="presentation"
            dir='rtl'
        >
            <List dir='rtl'>
                <ListItem>
                    <ListItemText>תאריכים</ListItemText>
                </ListItem>
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
                <ListItem sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
                    <Button variant={heart} onClick={handleHeart}>לב</Button>
                    <Button variant={home} onClick={handleHome}>בית</Button>
                    <Button variant={circle} onClick={handleCircle}>עיגול</Button>
                    <Button variant={david} onClick={handleMagen}>מגן דוד</Button>
                    <Button variant={triangular} onClick={handletriangle}>משולש</Button>
                </ListItem>
            </List>
            <Divider />
            <div>
                <Button variant='contained' onClick={toggleDrawer(anchor, false)}>שמירה</Button>
            </div>
        </Box>
    );

    const [value, setValue] = useState(null)
    const handleValue = (value) => {
        setValue(value)
    }
    const [textChange, setTextChange] = useState(null)
    const onInputChange = (value) => {
        setTextChange(value)
    }

    return (
        <div>
            <NavLink />
            <Stack spacing={2} dir='ltr'>
                <Breadcrumbs
                    sx={{ marginTop: 1, marginLeft: 3 }}
                    separator={<NavigateNextIcon fontSize="small" />}
                    aria-label="breadcrumb"
                >
                    {breadcrumbs}
                </Breadcrumbs>
            </Stack>
            {!isReady && <CircularProgress sx={{ position: 'fixed', top: '50%', left: '50%', height: '100px', width: '100px' }} />}
            {isReady && <div>
                <Box
                    dir='ltr'
                    component="form"
                    sx={{ display: 'flex', alignItems: 'center', placeContent: 'center', bgcolor: '#f0f0f2' }}
                >
                    {/* <IconButton fullHeigh color="primary" type="submit" sx={{
                        p: '10px', bgcolor: 'white', borderRadius: 0, height: '55px'
                    }} aria-label="search">
                        <SortIcon />
                    </IconButton> */}
                    {['left'].map((anchor) => (
                        <React.Fragment key={anchor}>
                            <IconButton color="primary" sx={{
                                p: '10px', bgcolor: 'white', borderRadius: 1, height: '55px', borderColor: 'primary.main',
                            }} aria-label="directions" onClick={toggleDrawer(anchor, true)}>
                                <FilterAltIcon sx={{borderColor: 'primary.main'}}/>
                            </IconButton>
                            <Drawer
                                anchor={anchor}
                                open={state[anchor]}
                                onClose={toggleDrawer(anchor, false)}
                            >
                                {list(anchor)}
                            </Drawer>
                            <AutoSearch dir='rtl' onInputChange={onInputChange} value={value} handleValue={handleValue} allKide={allKide} />
                        </React.Fragment>
                    ))}
                </Box>
                <Box sx={{ flexWrap: 'wrap', justifyContent: 'center', display: 'flex', flexWrap: 'wrap' }}>
                    {isReady && data.filter(item => {
                        if (selectedDayRange.from === null && selectedDayRange.to === null) { return true }
                        let dateStart;
                        let dateEnd;
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
                            let draw1 = item.timeStarted.slice(0, 10);
                            let draw = draw1;
                            console.log(draw1, dateEnd, dateStart, draw)
                            if (dateStart.slice(0, 4) <= draw.slice(0, 4) && draw1.slice(0, 4) <= dateEnd.slice(0, 4)) {
                                if (dateStart.slice(5, -3) <= draw.slice(5, -3) && draw1.slice(5, -3) <= dateEnd.slice(5, -3)) {
                                    if (dateStart.slice(8) <= draw.slice(8) && draw1.slice(8) <= dateEnd.slice(8)) {
                                        return item;
                                    }

                                }
                            }
                        }
                    }).filter(item => {
                        if (circle === 'outlined') { return true }
                        return (heart === 'contained' && item.shape.includes('heart')) || (david === 'contained' && item.shape.includes('david')) || (circle === 'contained' && item.shape.includes('circle')) || (triangular === 'contained' && item.shape.includes('triangular')) || (home === 'contained' && item.shape.includes('home'))
                    }).filter(item => {
                        if (triangular === 'outlined') { return true }
                        return (heart === 'contained' && item.shape.includes('heart')) || (david === 'contained' && item.shape.includes('david')) || (circle === 'contained' && item.shape.includes('circle')) || (triangular === 'contained' && item.shape.includes('triangular')) || (home === 'contained' && item.shape.includes('home'))
                    }).filter(item => {
                        if (home === 'outlined') { return true }
                        return (heart === 'contained' && item.shape.includes('heart')) || (david === 'contained' && item.shape.includes('david')) || (circle === 'contained' && item.shape.includes('circle')) || (triangular === 'contained' && item.shape.includes('triangular')) || (home === 'contained' && item.shape.includes('home'))
                    }).filter(item => {
                        if (heart === 'outlined') { return true }
                        return (heart === 'contained' && item.shape.includes('heart')) || (david === 'contained' && item.shape.includes('david')) || (circle === 'contained' && item.shape.includes('circle')) || (triangular === 'contained' && item.shape.includes('triangular')) || (home === 'contained' && item.shape.includes('home'))
                    }).filter(item => {
                        if (david === 'outlined') { return true }
                        return (heart === 'contained' && item.shape.includes('heart')) || (david === 'contained' && item.shape.includes('david')) || (circle === 'contained' && item.shape.includes('circle')) || (triangular === 'contained' && item.shape.includes('triangular')) || (home === 'contained' && item.shape.includes('home'))
                    }).filter(item => {
                        if (!textChange) { return true }
                        kid1 = allKide.find(k => k.id === item.firstKide)
                        kid2 = allKide.find(k => k.id === item.secondKide)
                        return kid1.name.includes(textChange) || kid2.name.includes(textChange)

                    }).map((item, key) => {
                        return (
                            <Box sx={{
                                justifyContent: 'center',
                                p: 1,
                                m: 1,
                                bgcolor: 'transparent',
                                borderRadius: 1,
                                width: '25%',
                            }}>
                                <Cards item={item} key={key} index={key} kid1={kid1} kid2={kid2} />
                            </Box>
                        )
                    })}
                </Box>
            </div>}
        </div>
    );
}