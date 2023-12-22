package com.awesomeproject;

import static android.app.PendingIntent.FLAG_MUTABLE;

import android.app.Notification;
import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.app.PendingIntent;
import android.content.Context;
import android.content.Intent;
import android.graphics.drawable.Icon;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

public class BubbleModule extends ReactContextBaseJavaModule {

    private static final String CHANNEL_ID = "Bubble";
    private static final int NOTIFICATION_ID = 1;

    public BubbleModule(ReactApplicationContext reactContext) {
        super(reactContext);
        createNotificationChannel();
    }

    @Override
    public String getName() {
        return "BubbleModule";
    }

    @ReactMethod
    public void showBubble() {
        Context context = getReactApplicationContext();

        // Create a bubble intent.
        Intent target = new Intent(context, MainActivity.class);
        PendingIntent bubbleIntent = PendingIntent.getActivity(context, 0, target, FLAG_MUTABLE /* flags */);

        Notification.BubbleMetadata bubbleData = createBubbleMetadata(bubbleIntent);

        // Build and show the notification
        showNotification(bubbleData);
    }

    private Notification.BubbleMetadata createBubbleMetadata(PendingIntent bubbleIntent) {
        return new Notification.BubbleMetadata.Builder(bubbleIntent, Icon.createWithResource(getReactApplicationContext(), R.drawable.ic_launcher_foreground))
                .setDesiredHeight(600)
                .build();
                
    }

    private void showNotification(Notification.BubbleMetadata bubbleData) {
        NotificationManager notificationManager = (NotificationManager) getReactApplicationContext().getSystemService(Context.NOTIFICATION_SERVICE);

        Notification.Builder builder;
        builder = new Notification.Builder(getReactApplicationContext(), CHANNEL_ID);

        builder.setContentIntent(bubbleData.getIntent())
                .setSmallIcon(R.drawable.ic_launcher_foreground)
                .setBubbleMetadata(bubbleData)
                .setAutoCancel(true);

        notificationManager.notify(NOTIFICATION_ID, builder.build());
    }

    private void createNotificationChannel() {
        NotificationChannel channel = new NotificationChannel(
                CHANNEL_ID,
                "Bubble Channel",
                NotificationManager.IMPORTANCE_HIGH
        );

        NotificationManager notificationManager = getReactApplicationContext().getSystemService(NotificationManager.class);
        notificationManager.createNotificationChannel(channel);
    }
}
