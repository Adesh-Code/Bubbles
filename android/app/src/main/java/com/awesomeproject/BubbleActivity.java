// /*
//  * Copyright (C) 2019 The Android Open Source Project
//  * Licensed under the Apache License, Version 2.0 (the "License");
//  * you may not use this file except in compliance with the License.
//  * You may obtain a copy of the License at
//  *
//  *       http://www.apache.org/licenses/LICENSE-2.0
//  *
//  * Unless required by applicable law or agreed to in writing, software
//  * distributed under the License is distributed on an "AS IS" BASIS,
//  * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
//  * See the License for the specific language governing permissions and
//  * limitations under the License.
//  */

// package com.awesomeproject;

// import android.net.Uri;
// import android.os.Bundle;

// import androidx.appcompat.app.AppCompatActivity;
// import com.awesomeproject.
// import com.example.awesomeP.people.ui.chat.ChatFragment;
// import com.example.android.people.ui.photo.PhotoFragment;

// /**
//  * Entry point of the app when it is launched as an expanded Bubble.
//  */
// public class BubbleActivity extends AppCompatActivity implements NavigationController {

//     @Override
//     protected void onCreate(Bundle savedInstanceState) {
//         super.onCreate(savedInstanceState);
//         setContentView(R.layout.bubble_activity);

//         long id = getIntent().getData() != null
//                 ? Long.parseLong(getIntent().getData().getLastPathSegment())
//                 : 0;

//         if (savedInstanceState == null) {
//             getSupportFragmentManager().beginTransaction()
//                     .replace(R.id.container, ChatFragment.newInstance(id, false))
//                     .commitNow();
//         }
//     }

//     @Override
//     public void openChat(long id, String prepopulateText) {
//         throw new UnsupportedOperationException("BubbleActivity always shows a single chat thread.");
//     }

//     @Override
//     public void openPhoto(Uri photo) {
//         // In an expanded Bubble, you can navigate between Fragments just like you would normally
//         // do in a normal Activity. Just make sure you don't block onBackPressed().
//         getSupportFragmentManager().beginTransaction()
//                 .addToBackStack(null)
//                 .replace(R.id.container, PhotoFragment.newInstance(photo))
//                 .commit();
//     }

//     @Override
//     public void updateAppBar(boolean showContact, boolean hidden, BodyUpdater bodyUpdater) {
//         // The expanded bubble does not have an app bar. Ignore.
//     }
// }
