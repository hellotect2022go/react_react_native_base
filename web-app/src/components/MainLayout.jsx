import { useState } from 'react';
import { AiFillHome } from 'react-icons/ai';
import { IoList, IoSettings } from 'react-icons/io5';
import { MdViewList } from 'react-icons/md';
import {
  Container,
  Content,
  BottomNav,
  NavItem,
  NavIcon,
  NavLabel,
  ActiveIndicator,
} from './MainLayout.styled';

function MainLayout({ children, onPageChange }) {
  const [activeTab, setActiveTab] = useState('home');

  const navItems = [
    { id: 'home', label: '홈', icon: AiFillHome },
    { id: 'list', label: '목록', icon: IoList },
    { id: 'list2', label: '목록2', icon: MdViewList },
    { id: 'settings', label: '설정', icon: IoSettings },
  ];

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
    if (onPageChange) {
      onPageChange(tabId);
    }
  };

  return (
    <Container>
      <Content>
        {children}
      </Content>
      
      <BottomNav>
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          
          return (
            <NavItem
              key={item.id}
              $active={isActive}
              onClick={() => handleTabClick(item.id)}
            >
              {isActive && <ActiveIndicator />}
              <NavIcon $active={isActive}>
                <Icon />
              </NavIcon>
              <NavLabel $active={isActive}>{item.label}</NavLabel>
            </NavItem>
          );
        })}
      </BottomNav>
    </Container>
  );
}

export default MainLayout;
