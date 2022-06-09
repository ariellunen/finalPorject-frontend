// import React, { useState } from "react";
// import "react-modern-calendar-datepicker/lib/DatePicker.css";
// import DatePicker from "react-modern-calendar-datepicker";

// const App = () => {
// const [selectedDay, setSelectedDay] = useState(null);
// const [selectedDayRange, setSelectedDayRange] = useState({
//     from: null,
//     to: null
// });
// console.log(selectedDayRange, selectedDay)
//     return (
//         <>
// <DatePicker
//     value={selectedDay}
//     onChange={setSelectedDay}
//     inputPlaceholder="Select a day"
//     shouldHighlightWeekends
// />
// <DatePicker
//     value={selectedDayRange}
//     onChange={setSelectedDayRange}
//     inputPlaceholder="Select a day range"
//     shouldHighlightWeekends
// />
//         </>
//     );
// };

// export default App;



import React, { useState, useEffect, useRef } from 'react';
import "react-modern-calendar-datepicker/lib/DatePicker.css";
import DatePicker from "react-modern-calendar-datepicker";
import Cards from '../component/Cards';
import Box from '@mui/material/Box';
import NavLink from '../../user/components/NavLinks';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';
import MenuIcon from '@mui/icons-material/Menu';
import DirectionsIcon from '@mui/icons-material/Directions';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import Button from '../../shared/components/FormElements/Button';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import Drawer from '@mui/material/Drawer';
import { Calendar } from "react-modern-calendar-datepicker";

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
export default function AllDraw() {
    const [state, setState] = useState({ left: false });
    const [isReady, setIsReady] = useState(false);
    const [data, setData] = useState(false);
    const [selectedDayRange, setSelectedDayRange] = useState({
        from: null,
        to: null
    });
    useEffect(() => {
        const getDraw = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/drawing/', {
                });
                const responseData = await response.json();
                setData(responseData.drawing);
                setIsReady(true);
            } catch (err) {
                console.log(err);
            }
        }
        getDraw();
    }, [isReady]);

    const toggleDrawer = (anchor, open) => (event) => {
        if (event.target.tagName === 'BUTTON') {
            setState({ ...state, [anchor]: open });
            if (selectedDayRange.from !== null && selectedDayRange.to !== null) {
                handleFilter();
            }
        }
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setState({ ...state, [anchor]: open });
    };

    const handleFilter = () => {
        let dateStart;
        let dateEnd;
        console.log(data[0].timeStarted.slice(0, 10))
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
                        console.log('true', draww)
                        filterArr.push(draww)

                    }
                }
            }

        });
        console.log(filterArr)
        // if (d1 < d2) {
        //     alert("Error! Date did not Match");
        // }
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
                {/* {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
                    <ListItem key={text} disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                            </ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItemButton>
                    </ListItem>
                ))} */}
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
            <Button onClick={toggleDrawer(anchor, false)}>שמירה</Button>
        </Box>
    );

    return (
        <div>
            <NavLink />
            <Paper
                component="form"
                sx={{ display: 'flex', alignItems: 'center', width: '80%' }}
            >
                <IconButton type="submit" sx={{ p: '10px' }} aria-label="search">
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

                    </React.Fragment>
                ))}
            </Paper>
            <Box sx={{ flexWrap: 'wrap', justifyContent: 'center', display: 'flex', flexWrap: 'wrap' }}>
                {filterArr?.length !== 0 ?
                    (filterArr.map((item, key) => {
                        return (
                            <Box sx={{
                                justifyContent: 'center',
                                p: 1,
                                m: 1,
                                bgcolor: 'background.paper',
                                borderRadius: 1,
                                width: '25%',
                            }}>
                                <Cards item={item} key={key} index={key} />
                            </Box>
                        )
                    })) : (data.map((item, key) => {
                        return (
                            <Box sx={{
                                justifyContent: 'center',
                                p: 1,
                                m: 1,
                                bgcolor: 'background.paper',
                                borderRadius: 1,
                                width: '25%',
                            }}>
                                <Cards item={item} key={key} index={key} />
                            </Box>
                        )
                    })
                    )}

            </Box>
        </div>
    );
}
