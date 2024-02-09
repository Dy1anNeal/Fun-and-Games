import time
import random
from words import words
import string
from tkinter import *
from functools import partial
from words import words
import sqlite3
import matplotlib.pyplot as plt

def find_words(words): #gets all 5 letter words out of a set of words
    valid_words = []
    for word in words:
        if len(word) == 5:
            valid_words.append(word)
        else:
            pass
    return valid_words

      
def analyse(coord): #a function to check words given by player
    global z
    global win
    
    x_coord = [50,150,250,350,450]
    letters = []
    correct_word = listify(answer,letters)

    user_letters = []
    in_word = user_word.get()
    in_word = in_word.lower()
    
    if len(in_word) != 5: #check to account for a player typing a word longer or shorter than 5 words
        print("try again") 
        
        word_entry.delete(0, END) #deletes word in entry box
    else:
        word = listify(in_word,user_letters)
    
        for n in range(5):
            if word[n] == correct_word[n]: #check if letter is in right place
                result = Label(text = word[n], bg = "green", height = 2, width = 4)
                result.place(x = x_coord[n],y = coord[z])
                
            elif word[n] not in correct_word: #check if letter is in word
                result = Label(text = word[n], bg = "red", height = 2, width = 4)
                result.place(x = x_coord[n],y = coord[z])
                
            else: #check if letter isnt in word
                result = Label(text = word[n], bg = "yellow", height = 2, width = 4)
                result.place(x = x_coord[n],y = coord[z])
        z += 1      

        if z > 5 and word != correct_word: #loss condition
            loss_text = Label(text = "YOU LOSE :( The word was: "+answer)
            loss_text.place(x = 180, y = (coord[z]+50))
            win = False
            restart()
            
        elif word == correct_word: #win condition
            win_text = Label(text = "YOU WIN :)")
            win_text.place(x = 180, y = (coord[z]+50))
            win = True
            restart()
            
        else:
            pass
        word_entry.delete(0, END)
    

    
def listify(word,empty_list): #turns a given word into a list of the contained letters
    for letter in word:
        empty_list.append(letter)
    return empty_list

def restart(): #function allowing a restart of quit of the game

    data = []

    results = Toplevel()

    replay = Button(results, text = "REPLAY?", bg = "grey", command = play_again)
    replay.grid(row = 1, column = 0)
    
    end = Button(results, text = "END GAME?", bg = "grey", command = fin)
    end.grid(row = 1, column = 1)   

def fin():
    quit()
    
def play_again():
    screen.destroy()
    wordle()

def wordle():
    global z
    global user_word
    global word_entry
    global screen
    global answer
    answer = random.choice(find_words(words))
    z = 0
    screen = Tk()
    screen.geometry("500x500")
    screen.title("Wordle V2.0")
    #screen.iconbitmap('C:\Users\dy1an\OneDrive\Desktop\Python\for fun python\wordle\Wordle game\w.ico')
    
    welcome_text = Label(text = "please input a 5 letter guess: ", fg = "red", bg = "yellow")
    welcome_text.pack()

    y_coord = [100,150,200,250,300,350,350]

    user_word = StringVar()
    word_entry = Entry(textvariable = user_word)
    word_entry.place(x = 190, y = 50)

    click_me = Button(text = "click me", fg = "red", bg = "yellow", command = partial(analyse, y_coord))
    click_me.place(x = 400, y = 50)    

wordle()

