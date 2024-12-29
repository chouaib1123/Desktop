import React from 'react';
import './Footer.css'; 

function Footer() {
    return (
        <footer>
       
        <div className="buttons">
            <ul>
                <li><img src="http://localhost:3000/Icon color (1).svg" alt="" /></li>
                <li><img src="http://localhost:3000/Icon color (2).svg" alt="" /></li>
                <li><img src="http://localhost:3000/Icon color (3).svg" alt="" /></li>
                <li><img src="http://localhost:3000/Icon color.svg" alt="" /></li>
            </ul>
            <ul>
            <li>المنتجات</li> 
            <li>للتواصل</li> 
            <li>الخصوصية</li>   
            </ul>
    </div>

    
        
       <span>© 2024 TayssirArt . شروط الاستخدام وسياسة الخصوصية</span> 

    </footer>
    );
}

export default Footer;
