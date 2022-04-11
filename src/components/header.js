import {Alert, Button} from '@mui/material';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import '../App.css';


export default function Header() {
    return (
        <header className="App-header">
            <Button className="menuButton" variant="contained"><AccessTimeOutlinedIcon style={{ color: "white" }}></AccessTimeOutlinedIcon></Button>
            <Button className="menuButton" variant="contained"><PersonOutlineOutlinedIcon style={{ color: "white" }}></PersonOutlineOutlinedIcon></Button>
        </header>
    ); 
}



