import gql from 'graphql-tag'

export default gql(`
  query User($slug: String!, $first: Int, $offset: Int) {
    User(slug: $slug) {
      id
      name
      avatar
      createdAt
      friendsCount
      friends {
        id
        name
        slug
        avatar
      }
      badges {
        id
        key
        icon
      }
      badgesCount
      shoutedCount
      commentsCount
      followingCount
      following(first: 7) {
        id
        name
        slug
        avatar
        followedByCount
        contributionsCount
        commentsCount
        badges {
          id
          key
          icon
        }
      }
      followedByCount
      followedBy(first: 7)  {
        id
        name
        slug
        avatar
        followedByCount
        contributionsCount
        commentsCount
        badges {
          id
          key
          icon
        }
      }
      contributionsCount
      contributions(first: $first, offset: $offset, orderBy: createdAt_desc) {
        id
        slug
        title
        contentExcerpt
        shoutedCount
        commentsCount
        deleted
        image
        createdAt
        author {
          id
          avatar
          name
        }
      }
    }
  }
`)
