import React, { useCallback, useMemo, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { WebView } from 'react-native-webview';
import { colors } from '../theme/theme';

type Props = {
  latex: string;
  displayMode?: boolean;
  caption?: string;
};

function buildKaTeXHtml(latex: string, displayMode: boolean, caption?: string): string {
  const captionHtml = caption
    ? `<div class="caption">${caption.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</div>`
    : '';

  return `<!DOCTYPE html>
<html>
<head>
  <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/katex.min.css">
  <script src="https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/katex.min.js"></script>
  <style>
    * { box-sizing: border-box; }
    html, body {
      margin: 0;
      padding: 0;
      background: transparent;
      overflow: hidden;
    }
    body {
      padding: ${displayMode ? '4px 8px' : '0 2px'};
      display: flex;
      flex-direction: column;
      align-items: ${displayMode ? 'center' : 'flex-start'};
      justify-content: center;
    }
    #math { color: ${colors.ink}; }
    .caption {
      margin-top: 8px;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      font-size: 14px;
      line-height: 20px;
      color: ${colors.muted};
      text-align: center;
    }
  </style>
</head>
<body>
  <div id="math"></div>
  ${captionHtml}
  <script>
    try {
      katex.render(${JSON.stringify(latex)}, document.getElementById('math'), {
        displayMode: ${displayMode},
        throwOnError: false,
        trust: false,
      });
    } catch (e) {}
    setTimeout(function() {
      var h = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
      window.ReactNativeWebView.postMessage(String(h));
    }, 50);
  </script>
</body>
</html>`;
}

export function KaTeXMath({ latex, displayMode = true, caption }: Props) {
  const [height, setHeight] = useState(displayMode ? 56 : 28);

  const html = useMemo(() => buildKaTeXHtml(latex, displayMode, caption), [latex, displayMode, caption]);

  const onMessage = useCallback((event: { nativeEvent: { data: string } }) => {
    const next = Number(event.nativeEvent.data);
    if (!Number.isNaN(next) && next > 0) {
      setHeight(next + 4);
    }
  }, []);

  return (
    <View style={[displayMode ? styles.displayWrap : styles.inlineWrap, { height }]}>
      <WebView
        originWhitelist={['*']}
        source={{ html }}
        scrollEnabled={false}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        style={styles.webview}
        onMessage={onMessage}
        javaScriptEnabled
        nestedScrollEnabled={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  displayWrap: {
    width: '100%',
    marginVertical: 10,
    borderLeftWidth: 4,
    borderLeftColor: colors.yellow,
    backgroundColor: '#FFF9E8',
    borderRadius: 8,
    overflow: 'hidden',
  },
  inlineWrap: {
    minWidth: 20,
    overflow: 'hidden',
  },
  webview: {
    flex: 1,
    backgroundColor: 'transparent',
  },
});
