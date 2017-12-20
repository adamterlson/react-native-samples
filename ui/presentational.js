/* @flow */

import * as React from 'react'
import { StyleSheet, View } from 'react-native'
import { colors, grid, dateFormats, fontSizes, borderRadius } from 'app/ui/style'
import Text from 'app/ui/presentational/Text'
import TextWithLinks from 'app/ui/presentational/TextWithLinks'
import moment from 'moment'
import MemberPhoto from 'app/ui/presentational/MemberPhoto'
import TextWithPopover from 'app/ui/presentational/TextWithPopover'

const styles = StyleSheet.create({
    container: {
        width: '85%',
    },
    sentContainer: {
        alignItems: 'flex-end',
        alignSelf: 'flex-end',
    },
    receivedContainer: {
        alignItems: 'flex-start',
        alignSelf: 'flex-start',
        flexDirection: 'row',
    },
    textBubbleContainer: {
        flexDirection: 'row',
    },
    textBubble: {
        borderColor: colors.neutral,
        borderRadius: borderRadius.small,
        padding: grid,
    },
    sentBubble: {
        backgroundColor: colors.neutral,
        alignItems: 'flex-end',
    },
    receivedBubble: {
        backgroundColor: colors.neutralBrightest,
    },
    receivedDate: {
        fontSize: fontSizes.small,
        color: colors.neutral,
    },
    sentDate: {
        fontSize: fontSizes.small,
        color: colors.neutral,
    },
    avatar: {
        top: 20,
        paddingRight: grid,
    },
    name: {
        color: colors.neutralDark,
        fontSize: fontSizes.small,
        paddingBottom: grid / 2,
    },
})

type PropTypes = {
    message: TMessage,
    sent: boolean,
    member: TMember,
    conversationType: 'private' | 'group' | 'official',
}

const Message = ({ message, sent, member, conversationType }: PropTypes) => {
    const type = sent ? 'sent' : 'received'
    const receivedGroupMessage = type === 'received' && conversationType === 'group'

    return (
        <View style={[styles.container, styles[`${type}Container`]]}>
            {receivedGroupMessage && (
                <View style={styles.avatar}>
                    <MemberPhoto member={member} size={32} />
                </View>
            )}
            <View style={styles.textBubbleContainer}>
                <TextWithPopover content={message.text}>
                    {receivedGroupMessage && (
                        <Text style={styles.name}>{`${member.firstName} ${member.lastName}`}</Text>
                    )}
                    <View style={[styles.textBubble, styles[`${type}Bubble`]]}>
                        <TextWithLinks>{message.text}</TextWithLinks>
                        <Text style={styles[`${type}Date`]}>{dateFormats.calendar(moment(message.createdOn))}</Text>
                    </View>
                </TextWithPopover>
            </View>
        </View>
    )
}

export default Message
