package Entitati;

import RateUpSystem.RateUpSystem;

import static MauLine.Constants.*;

import java.util.Random;
import java.util.Scanner;

public class Account {
    public String username;
    private String password;
    public String lastName;
    public String firstName;
    float rating;

    Scanner scanner = new Scanner(System.in);

    public Account() {

    }

    public Account(String username, String password, String lastName, String firstName) {
        this.username = username;
        this.password = password;
        this.lastName = lastName;
        this.firstName = firstName;
    }

    public String getPassword() {
        return password;
    }

    public void changePassword(String oldPassword, String newPassword) {
        if (this.password.equals(oldPassword)) {
            this.password = newPassword;
            System.out.println("Parola schimbata cu succes!");
        } else
            System.out.println("Parola nu a putut fi schimbata!");
    }

    public void resetPassword(String newPassword) {
        this.password = newPassword;
        System.out.println("Parola schimbata cu succes!");
    }

    public void resetUsername(String newUsername) {
        this.username = newUsername;
        System.out.println("Username schimbat cu succes!");
    }

    public void signUp() {
        System.out.println("Sign Up:");
        System.out.println("Introduceti numele:");
        this.lastName = scanner.nextLine();
        System.out.println("Introduceti prenumele:");
        this.firstName = scanner.nextLine();
        System.out.println("Introduceti un username:");
        this.username = scanner.nextLine();
        System.out.println("Introduceti o parola:");
        this.password = scanner.nextLine();


    }

    public void signIn() {
        System.out.println("Sign In:");
        System.out.println("Introduceti un username:");
        if (this.username.equals(scanner.nextLine())) {
            System.out.println("Introduceti o parola:");
            if (this.password.equals(scanner.nextLine()))
                System.out.println("Autentificare facuta cu succes de catre utilizatorul:" + this.firstName + " " + this.lastName);
            else {
                System.out.println("Parola introdusa este gresita");
                System.out.println("Daca vreti sa resetati parola apasati Y:");
                if (scanner.nextLine().equals("Y")) {
                    System.out.println("Introduceti noua parola");
                    resetPassword(scanner.nextLine());
                    signIn();
                } else
                    System.out.println("Autentificare esuata");


            }

        } else {
            System.out.println("Numele de utilizator introdus este gresit");
            System.out.println("Daca vreti sa resetati username-ul apasati Y:");
            if (scanner.nextLine().equals("Y")) {
                System.out.println("Introduceti noul username");
                resetUsername(scanner.nextLine());
                signIn();
            } else
                System.out.println("Autentificare esuata");

        }
    }

    public String toString() {
        return "Utilizatorul este " + this.firstName + " " + this.lastName + " ";
    }

    public float RateUp() {
        Random rand = new Random();
        int r1 = rand.nextInt(MAX_RATE - MIN_RATE) + AVARAGE_RATE;
        int r2 = rand.nextInt(MAX_RATE - MIN_RATE) + AVARAGE_RATE;
        int r3 = rand.nextInt(MAX_RATE - MIN_RATE) + AVARAGE_RATE;
        int r4 = rand.nextInt(MAX_RATE - MIN_RATE) + AVARAGE_RATE;
        int r5 = rand.nextInt(MAX_RATE - MIN_RATE) + AVARAGE_RATE;
        int r6 = rand.nextInt(MAX_RATE - MIN_RATE) + AVARAGE_RATE;


        RateUpSystem rateUpSystem = new RateUpSystem.RateBuilder()
                .communicationSkillsCount(r1)
                .punctualityCount(r2)
                .professionalismCount(r3)
                .safetyCount(r4)
                .respectfulness(r5)
                .cleanlinessCount(r6)
                .build();
        ;
        return rateUpSystem.getRating();

    }

    public float initRate() {
        this.rating = RateUp();
        return this.rating;
    }


}