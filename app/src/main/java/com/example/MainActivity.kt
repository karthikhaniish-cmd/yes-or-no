package com.example

import android.annotation.SuppressLint
import android.content.Context
import android.content.Intent
import android.os.Build
import android.os.Bundle
import android.os.VibrationEffect
import android.os.Vibrator
import android.os.VibratorManager
import android.view.ViewGroup
import android.webkit.JavascriptInterface
import android.webkit.WebChromeClient
import android.webkit.WebResourceRequest
import android.webkit.WebSettings
import android.webkit.WebView
import android.webkit.WebViewClient
import androidx.activity.ComponentActivity
import androidx.activity.compose.BackHandler
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.safeDrawingPadding
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Surface
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.platform.testTag
import androidx.compose.ui.viewinterop.AndroidView
import com.example.ui.theme.MyApplicationTheme

class MainActivity : ComponentActivity() {

  override fun onCreate(savedInstanceState: Bundle?) {
    super.onCreate(savedInstanceState)
    enableEdgeToEdge()
    setContent {
      MyApplicationTheme {
        Surface(
          modifier = Modifier
            .fillMaxSize()
            .background(Color(0xFF060810)),
          color = Color(0xFF060810)
        ) {
          MagicDecisionScreen(context = this)
        }
      }
    }
  }
}

/**
 * Native bridge passed into the Web app runtime so JavaScript can trigger
 * Android system sharing and hardware haptics.
 */
class AndroidWebAppBridge(private val context: Context) {

  @JavascriptInterface
  fun share(text: String) {
    try {
      val sendIntent = Intent().apply {
        action = Intent.ACTION_SEND
        putExtra(Intent.EXTRA_TEXT, text)
        type = "text/plain"
      }
      val shareIntent = Intent.createChooser(sendIntent, "Share Cosmic Fortune")
      shareIntent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK)
      context.startActivity(shareIntent)
    } catch (e: Exception) {
      e.printStackTrace()
    }
  }

  @JavascriptInterface
  fun haptic(durationMs: Long) {
    try {
      val safeDuration = durationMs.coerceIn(10L, 500L)
      if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.S) {
        val vibratorManager =
          context.getSystemService(Context.VIBRATOR_MANAGER_SERVICE) as? VibratorManager
        vibratorManager?.defaultVibrator?.vibrate(
          VibrationEffect.createOneShot(safeDuration, VibrationEffect.DEFAULT_AMPLITUDE)
        )
      } else {
        @Suppress("DEPRECATION")
        val vibrator = context.getSystemService(Context.VIBRATOR_SERVICE) as? Vibrator
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
          vibrator?.vibrate(
            VibrationEffect.createOneShot(safeDuration, VibrationEffect.DEFAULT_AMPLITUDE)
          )
        } else {
          @Suppress("DEPRECATION")
          vibrator?.vibrate(safeDuration)
        }
      }
    } catch (e: Exception) {
      e.printStackTrace()
    }
  }
}

@SuppressLint("SetJavaScriptEnabled")
@Composable
fun MagicDecisionScreen(context: Context) {
  var webViewRef by remember { mutableStateOf<WebView?>(null) }
  var canGoBack by remember { mutableStateOf(false) }

  BackHandler(enabled = canGoBack) {
    webViewRef?.let {
      if (it.canGoBack()) {
        it.goBack()
      }
    }
  }

  Box(
    modifier = Modifier
      .fillMaxSize()
      .safeDrawingPadding()
  ) {
    AndroidView(
      modifier = Modifier
        .fillMaxSize()
        .testTag("magic_app_webview"),
      factory = { ctx ->
        WebView(ctx).apply {
          layoutParams = ViewGroup.LayoutParams(
            ViewGroup.LayoutParams.MATCH_PARENT,
            ViewGroup.LayoutParams.MATCH_PARENT
          )
          setBackgroundColor(android.graphics.Color.parseColor("#060810"))

          settings.apply {
            javaScriptEnabled = true
            domStorageEnabled = true
            databaseEnabled = true
            allowFileAccess = true
            cacheMode = WebSettings.LOAD_DEFAULT
            useWideViewPort = true
            loadWithOverviewMode = true
            displayZoomControls = false
            builtInZoomControls = false
          }

          addJavascriptInterface(AndroidWebAppBridge(ctx), "AndroidBridge")

          webChromeClient = WebChromeClient()
          webViewClient = object : WebViewClient() {
            override fun shouldOverrideUrlLoading(
              view: WebView?,
              request: WebResourceRequest?
            ): Boolean {
              return false
            }

            override fun onPageFinished(view: WebView?, url: String?) {
              super.onPageFinished(view, url)
              canGoBack = view?.canGoBack() ?: false
            }
          }

          loadUrl("file:///android_asset/web/index.html")
          webViewRef = this
        }
      },
      update = { view ->
        webViewRef = view
      }
    )
  }
}
