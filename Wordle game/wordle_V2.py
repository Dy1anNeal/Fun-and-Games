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

      
def analyse(coord):
    global z
    global win
    
    x_coord = [50,150,250,350,450]
    letters = []
    correct_word = listify(answer,letters)

    user_letters = []
    in_word = user_word.get()
    in_word = in_word.lower()
    
    if len(in_word) != 5:
        print("try again")
        
        word_entry.delete(0, END)
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
    conn = sqlite3.connect("results_book.db")
    c = conn.cursor()

    c.execute("SELECT *, oid FROM results")
    records = c.fetchall()
    
    if z == 1:
        change = int(records[0][0]) + 1
        c.execute("""UPDATE results SET
        one = :one""",

        {"one": change})
    if z == 2:
        change = int(records[0][1]) + 1
        c.execute("""UPDATE results SET
        two = :two""",

        {"two": change})
    if z == 3:
        change = int(records[0][2]) + 1
        c.execute("""UPDATE results SET
        three = :three""",

        {"three": change})
    if z == 4:
        change = int(records[0][3]) + 1
        c.execute("""UPDATE results SET
        four = :four""",

        {"four": change})
    if z == 5:
        change = int(records[0][4]) + 1
        c.execute("""UPDATE results SET
        five = :five""",

        {"five": change})
    if z == 6 and win == True:
        change = int(records[0][5]) + 1
        c.execute("""UPDATE results SET
        six = :six""",

        {"six": change})
    if win == False:
        change = int(records[0][6]) + 1
        c.execute("""UPDATE results SET
        fails = :fails""",

        {"fails": change})

    c.execute("SELECT *, oid FROM results")
    records = c.fetchall()
    data = []
    count = 0
    for i in records[0]:
        if count <= 6:
            data.append(i)
        else:
            pass
        count += 1

    results = Toplevel()

    mylabel = Label(results, image = plt.bar([1,2,3,4,5,6,7], data))
    mylabel.grid(row = 0, column = 0, columnspan = 2)
    
    replay = Button(results, text = "REPLAY?", bg = "grey", command = play_again)
    replay.grid(row = 1, column = 0)
    
    end = Button(results, text = "END GAME?", bg = "grey", command = fin)
    end.grid(row = 1, column = 1)

    conn.commit()
    conn.close
   

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
    #screen.iconbitmap('C:\Users\dy1an\OneDrive\Desktop\for fun python\wordle\w.ico')
    
    welcome_text = Label(text = "please input a 5 letter guess: ", fg = "red", bg = "yellow")
    welcome_text.pack()

    y_coord = [100,150,200,250,300,350,350]

    user_word = StringVar()
    word_entry = Entry(textvariable = user_word)
    word_entry.place(x = 190, y = 50)

    click_me = Button(text = "click me", fg = "red", bg = "yellow", command = partial(analyse, y_coord))
    click_me.place(x = 400, y = 50)    
    #click_me.bind("<Return>",lambda:analyse(y_coord)) failed key binding

conn = sqlite3.connect("results_book.db")
c = conn.cursor()

##c.execute("""CREATE TABLE results (
##    one integer,
##    two integer,
##    three integer,
##    four integer,
##    five integer,
##    six integer,
##    fails integer
##    )
##    """)

##c.execute("INSERT INTO results VALUES (:one, :two, :three, :four, :five, :six, :fails)",
##            {
##                "one": 0,
##                "two": 0,
##                "three": 0,
##                "four": 0,
##                "five": 0,
##                "six": 0,
##                "fails": 0,
##            })


conn.commit()
conn.close

wordle()

