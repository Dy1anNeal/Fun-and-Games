from tkinter import *
from PIL import ImageTk, Image
import random
import time


root = Tk()
root.title("ROCK VS PAPER VS SCISSORS")

#
rock_img = ImageTk.PhotoImage(Image.open(
    "Images/rock.png"))
paper_img = ImageTk.PhotoImage(Image.open(
    "Images/paper.png"))
scissors_img = ImageTk.PhotoImage(Image.open(
    "Images/scissors.png"))

Image_list = [rock_img,paper_img,scissors_img]

def play():
    global my_label
    global rock_button
    global paper_button
    global scissors_button
    
    my_label.forget()
    play_button.forget()

    my_label = Label(text = "Choose your fighter...")
    rock_button = Button(root,text = "ROCK", command = lambda: battle("rock"))
    paper_button = Button(root,text = "PAPER", command = lambda: battle("paper"))
    scissors_button = Button(root,text = "SCISSORS", command = lambda: battle("scissors"))

    my_label.grid(row = 0, column = 1)
    rock_button.grid(row = 1, column = 0)
    paper_button.grid(row = 1, column = 1)
    scissors_button.grid(row = 1, column = 2)

def play_again():
    for widget in root.winfo_children():
        widget.destroy()
    play()
        
def battle(fighter):
    global my_label
    
    
    my_label.destroy()
    rock_button.destroy()
    paper_button.destroy()
    scissors_button.destroy()

    
    my_label = Label(text = "FIGHT", bg = "black", fg = "red")
    my_label.grid(row = 0, column = 1)

    if fighter == "rock":
        left = Label(image = rock_img)
    if fighter == "paper":
        left = Label(image = paper_img)
    if fighter == "scissors":
        left = Label(image = scissors_img)
    left.grid(row = 1, column = 0)
    
    vs_label = Label(text = "VS", bg = "black", fg = "red")
    vs_label.grid(row = 1, column = 1)

    enemy = random.choice(Image_list)
    right = Label(image = enemy)
    right.grid(row = 1, column = 2)
    enemy = str(enemy)
    
    
    #WIN------------------------------------------------------------------
    if ((fighter == "rock" and enemy == "pyimage3")
    or (fighter == "paper" and enemy == "pyimage1")
    or (fighter == "scissors" and enemy == "pyimage2")):
        
        end = Label(text = "YOU WIN :)", bg = "black", fg = "green")
    #LOSE------------------------------------------------------------------
    elif ((fighter == "rock" and enemy == "pyimage2")
    or (fighter == "paper" and enemy == "pyimage3")
    or (fighter == "scissors" and enemy == "pyimage1")):
        
        end = Label(text = "YOU LOSE :(", bg = "black", fg = "red")
    #DRAW------------------------------------------------------------------
    else:
        end = Label(text = "We drew _/(.-.)\_", bg = "black", fg = "yellow")
        
    end.grid(row = 2, column = 1)

    replay = Button(text = "REPLAY?", bg = "grey", command = play_again)
    replay.grid(row = 2, column = 2)
    
    end = Button(text = "END GAME?", bg = "grey", command = lambda: quit())
    end.grid(row = 2, column = 0)
    
    
def rps():
    global my_label
    global play_button
    my_label = Label(text = "Play rock paper scissors?")
    my_label.pack()
    play_button = Button(root,text = "PLAY?", command = play)
    play_button.pack()
    
    root.mainloop()

rps()
