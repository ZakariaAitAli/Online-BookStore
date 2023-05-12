package com.onlinebookstore.models;

import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;

import javax.net.ssl.HttpsURLConnection;
import java.io.IOException;
import java.io.InputStream;
import java.net.URL;
import java.util.Scanner;

public class BookImageFetcher {

    public static String getImageUrl(String bookName) throws IOException {
        String query = "intitle:" + bookName.replace(" ", "+") ;
        String url = "https://www.googleapis.com/books/v1/volumes?q=" + query + "&fields=items(volumeInfo/imageLinks/thumbnail)";
        HttpsURLConnection connection = (HttpsURLConnection) new URL(url).openConnection();
        connection.setRequestMethod("GET");

        InputStream response = connection.getInputStream();
        Scanner scanner = new Scanner(response).useDelimiter("\\A");
        String responseBody = scanner.hasNext() ? scanner.next() : "";
        scanner.close();

        // Parse the JSON response and extract the thumbnail image link for the first book
        Gson gson = new Gson();
        JsonObject jsonResponse = gson.fromJson(responseBody, JsonObject.class);
        JsonArray items = jsonResponse.getAsJsonArray("items");
        if (items.size() > 0) {
            JsonObject volumeInfo = items.get(0).getAsJsonObject().getAsJsonObject("volumeInfo");
            if (volumeInfo.has("imageLinks")) {
                JsonObject imageLinks = volumeInfo.getAsJsonObject("imageLinks");
                JsonElement thumbnailElement = imageLinks.get("thumbnail");
                if (thumbnailElement != null) {
                    return thumbnailElement.getAsString();
                }
            }
        }

        return null;
    }
}
