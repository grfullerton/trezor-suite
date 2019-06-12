import React from 'react';
import { connect } from 'react-redux';
import { State } from '@suite-types/index';
import styled from 'styled-components';
import CoinMenu from '@wallet-components/CoinMenu';
import { variables, animations, colors } from '@trezor/components';

const { SCREEN_SIZE } = variables;
const { SLIDE_RIGHT, SLIDE_LEFT } = animations;

interface Props {
    router: State['router'];
    suite: State['suite'];
    children: React.ReactNode;
    isOpen: boolean;
}

const AbsoluteWrapper = styled.aside<Props>`
    width: 320px;
    position: relative;
    overflow-y: auto;

    background: ${colors.MAIN};
    border-top-left-radius: 4px;
    border-right: 1px solid ${colors.DIVIDER};

    overflow-x: hidden;

    @media screen and (max-width: ${SCREEN_SIZE.SM}) {
        position: absolute;
        z-index: 200;
        top: 52px;
        /* Prevents firing SLIDE_LEFT anim on page load.  */
        /* isOpen is null until user clicks on menu toggler */
        display: ${props => (props.isOpen === undefined ? 'none' : 'block')};
        animation: ${props => (props.isOpen ? SLIDE_RIGHT : SLIDE_LEFT)} 0.25s
            cubic-bezier(0.17, 0.04, 0.03, 0.94) forwards;
    }

    @media screen and (max-width: ${SCREEN_SIZE.LG}) {
        border-top-left-radius: 0px;
    }
`;

const SidebarWrapper = styled.div`
    height: 100%;
    display: flex;
    flex-direction: column;

    @media screen and (max-width: ${SCREEN_SIZE.SM}) {
        height: calc(100vh - 52px);
    }
`;

const Sidebar = ({ isOpen, ...rest }: Props) => (
    <AbsoluteWrapper isOpen={isOpen} {...rest}>
        <SidebarWrapper>
            <CoinMenu />
        </SidebarWrapper>
    </AbsoluteWrapper>
);

const mapStateToProps = (state: State) => ({
    router: state.router,
    suite: state.suite,
});

export default connect(mapStateToProps)(Sidebar);
