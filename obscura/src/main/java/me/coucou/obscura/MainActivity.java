package me.coucou.obscura;

import android.annotation.TargetApi;
import android.app.Activity;
import android.app.Fragment;
import android.hardware.Sensor;
import android.hardware.SensorEvent;
import android.hardware.SensorEventListener;
import android.hardware.SensorManager;
import android.os.Build;
import android.os.Bundle;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.Menu;
import android.view.MenuItem;
import android.view.View;
import android.view.ViewGroup;
import android.view.Window;
import android.view.WindowManager;
import android.webkit.ConsoleMessage;
import android.webkit.WebChromeClient;
import android.webkit.WebSettings;
import android.webkit.WebView;

public class MainActivity extends Activity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        //Full screen
        requestWindowFeature(Window.FEATURE_NO_TITLE);
        getWindow().setFlags(WindowManager.LayoutParams.FLAG_FULLSCREEN,
                WindowManager.LayoutParams.FLAG_FULLSCREEN);

        setContentView(R.layout.activity_main);

       if (savedInstanceState == null) {
            getFragmentManager().beginTransaction()
                    .add(R.id.container, new PlaceholderFragment())
                    .commit();
        }
    }


    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        
        // Inflate the menu; this adds items to the action bar if it is present.
        getMenuInflater().inflate(R.menu.main, menu);
        return true;
    }

    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        // Handle action bar item clicks here. The action bar will
        // automatically handle clicks on the Home/Up button, so long
        // as you specify a parent activity in AndroidManifest.xml.
        int id = item.getItemId();
        if (id == R.id.action_settings) {
            return true;
        }
        return super.onOptionsItemSelected(item);
    }

    /**
     * A placeholder fragment containing a simple view.
     */
    public static class PlaceholderFragment extends Fragment implements SensorEventListener{
        private SensorManager sMgr;
        private Sensor senAccelerometer;

        //private TextView textViewX;
        //private TextView textViewY;
        //private TextView textViewZ;

        private float lastX = 0.f;
        private float lastY = 0.f;
        private float lastZ = 0.f;

        private WebView webView;

        public PlaceholderFragment() {

        }

        @TargetApi(Build.VERSION_CODES.JELLY_BEAN)
        @Override
        public View onCreateView(LayoutInflater inflater, ViewGroup container,
                Bundle savedInstanceState) {
            View rootView = inflater.inflate(R.layout.fragment_main, container, false);

            webView = (WebView) rootView.findViewById(R.id.gameWebView);

            webView.setWebChromeClient(new WebChromeClient() {
                public boolean onConsoleMessage(ConsoleMessage cm) {
                    Log.d("MyApplication", cm.message() + " -- From line "
                            + cm.lineNumber() + " of "
                            + cm.sourceId());
                    return true;
                }
            });

            WebSettings webSettings = webView.getSettings();
            webSettings.setJavaScriptEnabled(true);
            webSettings.setAllowFileAccessFromFileURLs(true); //Maybe you don't need this rule
            webSettings.setAllowUniversalAccessFromFileURLs(true);
            webView.loadUrl("file:///android_asset/game/index.html");

            // Use the accelerometer.
            sMgr = (SensorManager)getActivity().getSystemService(SENSOR_SERVICE);
            if (sMgr.getDefaultSensor(Sensor.TYPE_ACCELEROMETER) != null){
                senAccelerometer = sMgr.getDefaultSensor(Sensor.TYPE_ACCELEROMETER);
                sMgr.registerListener(this, senAccelerometer , SensorManager.SENSOR_DELAY_NORMAL);
            }else {
                Log.d("PlaceholderFragment", "No Accelerometer available");
            }

            return rootView;
        }

        private long lastUpdate;

        /*
         * time smoothing constant for low-pass filter
         * 0 ≤ α ≤ 1 ; a smaller value basically means more smoothing
         * See: http://en.wikipedia.org/wiki/Low-pass_filter#Discrete-time_realization
         */
        static final float ALPHA = 0.2f;

        protected float[] accelVals;

        @Override
        public void onSensorChanged(SensorEvent event) {

            //TODO: Is this needed?
           /* if(textViewX == null || textViewY== null || textViewZ == null) {
                return;
            }
            */

            Sensor mySensor = event.sensor;

            if (mySensor.getType() == Sensor.TYPE_ACCELEROMETER) {
                accelVals = lowPass( event.values, accelVals );
                float x = accelVals[0];// + lastX;
                float y = accelVals[1];// + lastY;
                float z = accelVals[2];// + lastZ;

                //long curTime = System.currentTimeMillis();

                //if ((curTime - lastUpdate) > 100) {
                //    lastUpdate = curTime;

                    //textViewX.setText("X:" + x);
                    //textViewY.setText("Y:" + y);
                    //textViewZ.setText("Z:" + z);

                    /*
                    textViewX.setText("X:" + Math.abs(lastX - x));
                    textViewY.setText("Y:" + Math.abs(lastY - y));
                    textViewZ.setText("Z:" + Math.abs(lastZ - z));
                    */

                    lastX = x;
                    lastY = y;
                    lastZ = z;
                    String params = "javascript:move(" + x + ", "+ y +","+ z +")";
                    //webView.loadUrl("javascript:move(\"" + y + "\")");
                    Log.d("javascript"," params:"+ params);
                    webView.loadUrl(params);

                //}
            }
        }

        /**
         * @see http://en.wikipedia.org/wiki/Low-pass_filter#Algorithmic_implementation
         * @see http://en.wikipedia.org/wiki/Low-pass_filter#Simple_infinite_impulse_response_filter
         */
        protected float[] lowPass( float[] input, float[] output ) {
            if ( output == null ) return input;

            for ( int i=0; i<input.length; i++ ) {
                output[i] = output[i] + ALPHA * (input[i] - output[i]);
            }
            return output;
        }

        @Override
        public void onAccuracyChanged(Sensor sensor, int accuracy) {

        }

        @Override
        public void onPause() {
            super.onPause();
            sMgr.unregisterListener(this);
        }

        @Override
        public void onResume() {
            super.onResume();
            sMgr.registerListener(this, senAccelerometer, SensorManager.SENSOR_DELAY_NORMAL);
        }
    }

}
