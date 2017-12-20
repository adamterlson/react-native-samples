/* @flow */

import * as React from 'react'
import FlexView from 'app/ui/presentational/FlexView'
import { flowRight as compose } from 'lodash'
import { connect, type Connector } from 'react-redux'
import * as storeActions from 'app/store/actions'
import * as routeKeys from 'app/ui/routes/keys'
import { mapAllConversations } from 'app/ui/mappers'
import data from 'app/ui/enhancers/data'
import pagination, { type PaginationProps } from 'app/ui/enhancers/pagination'
import * as apiActions from 'app/saga/api/actions'
import ConversationTeaser from 'app/ui/connected/ConversationTeaser'
import Container from 'app/ui/presentational/Container'
import SwipeableList from 'app/ui/presentational/SwipeableList'
import FloatingButton from 'app/ui/presentational/FloatingButton'

type ConnectedPropTypes = {
    conversations: TConversation[],
    onSwipe: (item: any) => mixed,
    onCreateMessagePress: () => mixed,
}

const renderItem = (item: { id: string }) => (
    <Container padding>
        <ConversationTeaser id={item.id} />
    </Container>
)

const AllConversations = (props: ConnectedPropTypes & PaginationProps) => (
    <FlexView>
        <SwipeableList
            data={props.conversations}
            onSwipe={props.onSwipe}
            renderItem={renderItem}
            onEndReached={props.onLoadNextPage}
            onEndReachedThreshold={10}
        />
        <FloatingButton onPress={props.onCreateMessagePress} />
    </FlexView>
)

const conversationsConnector: Connector<{}, ConnectedPropTypes> = connect(mapAllConversations, {
    onSwipe: item => apiActions.reqConversationDelete(item.serverId),
    onCreateMessagePress: () =>
        storeActions.navigate({
            routeName: routeKeys.CreatePrivateConversation,
        }),
})

export default compose(
    conversationsConnector,
    data({
        onMount: apiActions.reqConversations,
    }),
    pagination('conversations', {
        limit: 10,
        onLoadNextPage: apiActions.reqConversations,
    }),
)(AllConversations)
