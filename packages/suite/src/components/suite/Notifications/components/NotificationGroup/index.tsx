import { NotificationEntry } from '@suite-reducers/notificationReducer';
import { AppState } from '@suite-types';
import { variables, P } from '@trezor/components';
import { Translation } from '@suite-components';
import React from 'react';
import styled from 'styled-components';
import NotificationList from '../NotificationList';

const SectionHeadline = styled.div`
    margin-top: 14px;
    font-size: ${variables.FONT_SIZE.TINY};
    font-weight: ${variables.FONT_WEIGHT.DEMI_BOLD};
    text-transform: uppercase;
    color: ${props => props.theme.TYPE_LIGHT_GREY};
    height: 16px;
    line-height: 1.33;
    letter-spacing: 0.2px;
    opacity: 0.6;
`;

const EmptyWrapper = styled.div`
    white-space: break-spaces;
`;

const EmptyHeadline = styled.div`
    font-size: ${variables.FONT_SIZE.BIG};
    font-weight: ${variables.FONT_WEIGHT.MEDIUM};
    margin: 10px 0 6px 0;
    opacity: 0.9;
`;

const EmptyDescriptionP = styled(P)`
    opacity: 0.7;
`;

const getSeenAndUnseenNotifications = (notifications: AppState['notifications']) => {
    const seen: Array<NotificationEntry> = [];
    const unseen: Array<NotificationEntry> = [];

    // loop over all notifications and check which of there were seen or not
    notifications.forEach(notification => {
        if (notification.seen) {
            seen.push(notification);
        } else {
            unseen.push(notification);
        }
    });

    return { seenNotifications: seen, unseenNotifications: unseen };
};
interface Props {
    notifications: AppState['notifications'];
}
const NotificationGroup = (props: Props) => {
    const { seenNotifications, unseenNotifications } = getSeenAndUnseenNotifications(
        props.notifications,
    );

    const seenCount = seenNotifications.length;
    const unseenCount = unseenNotifications.length;

    if (unseenCount === 0 && seenCount === 0) {
        return (
            <EmptyWrapper>
                <EmptyHeadline>
                    <Translation id="NOTIFICATIONS_EMPTY_TITLE" />
                </EmptyHeadline>
                <EmptyDescriptionP size="small">
                    <Translation id="NOTIFICATIONS_EMPTY_DESC" />
                </EmptyDescriptionP>
            </EmptyWrapper>
        );
    }

    return (
        <>
            {unseenCount > 0 && (
                <>
                    <SectionHeadline>{unseenCount} unread</SectionHeadline>
                    <NotificationList notifications={unseenNotifications} />
                </>
            )}

            {seenCount > 0 && (
                <>
                    <SectionHeadline>All read</SectionHeadline>
                    <NotificationList notifications={seenNotifications} />
                </>
            )}
        </>
    );
};

export default NotificationGroup;
