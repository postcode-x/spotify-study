import spotipy
from spotipy.oauth2 import SpotifyClientCredentials
import copy
import json


# Billboard's Top 100 for each year between 1960 and 2020

all_playlists = [

    'https://open.spotify.com/playlist/0nfHJsAnubkIUXrazaqHL9',
    'https://open.spotify.com/playlist/2exnqHJRp35x21SkJnl9gT',
    'https://open.spotify.com/playlist/2aYXRqQ94EGQAv5VkkVgsS',
    'https://open.spotify.com/playlist/6D9AREvr54KrlddMk8ddjY',
    'https://open.spotify.com/playlist/0LzQCtyGyaxOy7EYJa5ftD',
    'https://open.spotify.com/playlist/1JVcWmCSVFx0hudhF4i3EA',
    'https://open.spotify.com/playlist/1bqw3aB9lfWna30GlQGjmj',
    'https://open.spotify.com/playlist/1oDGNVF808a7CV2IDC7RlW',
    'https://open.spotify.com/playlist/1nXUxzlc9BVRTTfXEBgub0',
    'https://open.spotify.com/playlist/4EokgHiNEETCx7o1N4JFYV',

    'https://open.spotify.com/playlist/4Ur5dnjKkGgjPSJpwKBHDd',
    'https://open.spotify.com/playlist/1G9hi0G4TAUYYjVDHKWjLt',
    'https://open.spotify.com/playlist/7CIeE38SdXZ9J0M76QRhmS',
    'https://open.spotify.com/playlist/3qHtfSNA5CPQv940LOhvXx',
    'https://open.spotify.com/playlist/69dtPFfkYa5URry1zo665z',
    'https://open.spotify.com/playlist/5ows8MyC8CN95GTbgTovnd',
    'https://open.spotify.com/playlist/6q6DzFMMwpYeU2a90J5IyJ',
    'https://open.spotify.com/playlist/4y8bF3PpXtsDrcY7f2eF6I',
    'https://open.spotify.com/playlist/4J4rsjuzvXNcF996nPP2pG',
    'https://open.spotify.com/playlist/2UyRp835jE1196AlBV4NDM',

    'https://open.spotify.com/playlist/6BGXLlqwvOkM4JdWXxjmER',
    'https://open.spotify.com/playlist/6EaLmdD8KZvXiBER0VgY8L',
    'https://open.spotify.com/playlist/4CMIUVqmIe8LOosUhd9YxU',
    'https://open.spotify.com/playlist/74BP9iaXq354DmPUepjzNC',
    'https://open.spotify.com/playlist/1ux0KmjmnQCNQzQ0BH7kbl',
    'https://open.spotify.com/playlist/3lluUY967E5z4WnNeJKDV2',
    'https://open.spotify.com/playlist/2FEAysct4thAiYGojrHKlM',
    'https://open.spotify.com/playlist/4lgzCdoCCntR8RizaMlGOC',
    'https://open.spotify.com/playlist/6D0WkFzwCx5pxfD5jX0wkL',
    'https://open.spotify.com/playlist/0RQPCufJ8sFM0f6diGOqx2',

    'https://open.spotify.com/playlist/2Ezq5tXBfcm08IgV6jVbD5',
    'https://open.spotify.com/playlist/4ASN0RlS651kVOnRsohaFL',
    'https://open.spotify.com/playlist/3n98oIBshWorMOLJazIfJS',
    'https://open.spotify.com/playlist/45iNcb8ojtrQARtEpcpvvv',
    'https://open.spotify.com/playlist/5NBp8N1KQBFipfxTJ9eYEe',
    'https://open.spotify.com/playlist/3KBYrJrYxfw9meQLwZcLh2',
    'https://open.spotify.com/playlist/0e5LYEb4oqWeVCDhTKLCBQ',
    'https://open.spotify.com/playlist/2KizNGg9OiXSt2f8RyRGcr',
    'https://open.spotify.com/playlist/62FCnGM83VWvtv6zAlMgTd',
    'https://open.spotify.com/playlist/7gTvhRcUZaXt8ydN3AAIqF',

    'https://open.spotify.com/playlist/5FPS4YigpTkW5BReGWqQhf',
    'https://open.spotify.com/playlist/1js2rPNvOkRSFkyI5FnQ6e',
    'https://open.spotify.com/playlist/4TG8HBGn9f7EbiV5cibtsj',
    'https://open.spotify.com/playlist/3dsiLilXfNsM5fL3ClrlVj',
    'https://open.spotify.com/playlist/4INZgHh1xAfPjwRN7yaSvJ',
    'https://open.spotify.com/playlist/0jh6TBqviZXDFn1fZM8Wew',
    'https://open.spotify.com/playlist/0DthnHBXSwIxUAzqptGBbD',
    'https://open.spotify.com/playlist/7CfB12LIkB2u0Niih3WVEQ',
    'https://open.spotify.com/playlist/4QqwqZp8n44dBOaogjhpSO',
    'https://open.spotify.com/playlist/18CuW6LdJvxNLaMPIuJAyr',

    'https://open.spotify.com/playlist/0JnJKrKjU6BHVm8D2AyLvm',
    'https://open.spotify.com/playlist/0RRYgfRpt6vl69aHmIwAti',
    'https://open.spotify.com/playlist/59B77qi1KbJQnXLPHQDwXh',
    'https://open.spotify.com/playlist/6pOOQmsYBzo5V4zXywR8lu',
    'https://open.spotify.com/playlist/1harArs7ZDwRr2YNtUIDj0',
    'https://open.spotify.com/playlist/7fW8dnRbe3Gn7zCa4Tpe1D',
    'https://open.spotify.com/playlist/7cMea3Bz4KkI6cUL8sD8bo',
    'https://open.spotify.com/playlist/5zwfiK4sQwXh8NyHGwMtbz',
    'https://open.spotify.com/playlist/2HuoJUXq42R4mA1xVmz0ZN',
    'https://open.spotify.com/playlist/5eBfLMqlukVxH0DY8TtfnG',
    'https://open.spotify.com/playlist/6UeSakyzhiEt4NB3UAd6NQ'
]

myClientId = ''
myClientSecret = ''

client_credentials_manager = SpotifyClientCredentials(client_id=myClientId, client_secret=myClientSecret)
sp = spotipy.Spotify(client_credentials_manager=client_credentials_manager)

firstYear = 1960
playlists = {}

for x in range(0, len(all_playlists)):
    playlists[firstYear + x] = all_playlists[x]

playlist_data = []
keys = list(playlists.keys())

for x in range(0, len(keys)):
    try:
        playlist_data.append((keys[x], sp.playlist_items(playlists[keys[x]],
                                                         fields='items(track(name,id,popularity,artists))')))
    except ValueError:
        print("An exception occurred.", ValueError)

for k in range(0, len(playlist_data)):
    tmp = []
    for n in range(0, len(playlist_data[k][1]['items'])):
        try:
            tmp.append({'id': playlist_data[k][1]['items'][n]['track']['id'],
                        'name': playlist_data[k][1]['items'][n]['track']['name'],
                        'popularity': playlist_data[k][1]['items'][n]['track']['popularity'],
                        'artists': playlist_data[k][1]['items'][n]['track']['artists'],
                        'features': sp.audio_features(playlist_data[k][1]['items'][n]['track']['id'])[0]})
            print(n + 1, 'tracks appended. Current: ', tmp[-1]['name'])
        except ValueError:
            print("An exception occurred. Song is probably unavailable in your region", ValueError)

    with open('data\\playlist-' + str(playlist_data[k][0]) + '.json', 'w', encoding='utf-8') as f:
        json.dump({'year': playlist_data[k][0], 'data': copy.copy(tmp)}, f, ensure_ascii=False, indent=3)
