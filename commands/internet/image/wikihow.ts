import { MessageOptions } from 'discord.js'
import random from '../../../utils/random'
import fetch from 'node-fetch'

interface File {
  name: string
  path: string
  sha: string
  url: string
  git_url: string
  html_url: string
  score: number
  repository: {
    id: number
    node_id: string
    name: string
    full_name: string
    private: boolean
    owner: {
      login: string
      id: number
      node_id: string
      avatar_url: string
      gravatar_id: string
      url: string
      html_url: string
      followers_url: string
      following_url: string
      gists_url: string
      starred_url: string
      subscriptions_url: string
      organizations_url: string
      repos_url: string
      events_url: string
      received_events_url: string
      type: string
      site_admin: boolean
    }
    html_url: string
    description: string
    fork: boolean
    url: string
    forks_url: string
    keys_url: string
    collaborators_url: string
    teams_url: string
    hooks_url: string
    issue_events_url: string
    events_url: string
    assignees_url: string
    branches_url: string
    tags_url: string
    blobs_url: string
    git_tags_url: string
    git_refs_url: string
    trees_url: string
    statuses_url: string
    languages_url: string
    stargazers_url: string
    contributors_url: string
    subscribers_url: string
    subscription_url: string
    commits_url: string
    git_commits_url: string
    comments_url: string
    issue_comment_url: string
    contents_url: string
    compare_url: string
    merges_url: string
    archive_url: string
    downloads_url: string
    issues_url: string
    pulls_url: string
    milestones_url: string
    notifications_url: string
    labels_url: string
    releases_url: string
    deployments_url: string
  }
}

interface Root {
  total_count: number
  incomplete_results: boolean
  items: File[]
}

interface ItemURL {
  download_url: string
  name: string
}
export async function run (): Promise<MessageOptions> {
  const { items }: Root = await fetch('https://api.github.com/search/code?q=extension:jpg+repo:AhoyLemon/damn.dog').then(res => res.json())
  const { url } = random(items)
  const { download_url, name }: ItemURL = await (await fetch(url)).json()
  const title = name.replace('.jpg', '').split('-').map(item => {
    return item.charAt(0).toUpperCase() + item.substring(1)
  }).join(' ')
  return {
    embed: {
      author: {
        name: 'wikiHow',
        iconURL: 'https://www.wikihow.com/skins/WikiHow/wH-initials_152x152.png',
        url: 'https://www.wikihow.com'
      },
      title: 'How To ' + title,
      color: 0xeaecf0,
      url: 'https://www.wikihow.com/' + title.split(' ').join('-'),
      image: {
        url: download_url
      },
      footer: {
        text: 'List from damn.dog by Lemon',
        iconURL: 'https://damn.dog/favicon-194x194.png'
      }
    }
  }
}
export const help = 'Get a random odd wikiHow image'
export const aliases = ['wikiHow', 'WikiHow']
