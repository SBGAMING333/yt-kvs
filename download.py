from pytube import YouTube
import sys
import json

def download_video(url, format_type, quality):
    yt = YouTube(url)
    if format_type == 'audio':
        stream = yt.streams.filter(only_audio=True).first()
    else:
        if quality == 'highest':
            stream = yt.streams.get_highest_resolution()
        else:
            stream = yt.streams.filter(res=quality).first()
            if not stream:
                stream = yt.streams.get_highest_resolution()
    
    if format_type == 'audio':
        file_path = stream.download(filename='downloaded_audio')
        return 'downloaded_audio.mp3'
    else:
        file_path = stream.download(filename='downloaded_video')
        return 'downloaded_video.mp4'

if __name__ == '__main__':
    try:
        url = sys.argv[1]
        format_type = sys.argv[2]
        quality = sys.argv[3]

        file_path = download_video(url, format_type, quality)
        print(json.dumps({'success': True, 'download_link': file_path}))
    except Exception as e:
        print(json.dumps({'success': False, 'error_message': str(e)}))
