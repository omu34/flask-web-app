from flask import Blueprint, render_template, request, flash, jsonify
from flask_login import login_required, current_user
from .models import About, Note
from . import db
import json

views = Blueprint('views', __name__)


@views.route('/', methods=['GET', 'POST'])
@login_required
def home():
    if request.method == 'POST':
        note = request.form.get('note')

        if len(note) < 1:
            flash('Note is too short!', category='error')
        else:
            new_note = Note(data=note, user_id=current_user.id)
            db.session.add(new_note)
            db.session.commit()
            flash('Note added!', category='success')

    return render_template("home.html", user=current_user)


@views.route('/about', methods=['GET', 'POST'])
@login_required
def about():
    if request.method == 'POST':
        about = request.form.get('about')

        if len(about) < 1:
            flash('About is too short!', category='error')
        else:
            new_about = Note(data=about, user_id=current_user.id)
            db.session.add(new_about)
            db.session.commit()
            flash('About added!', category='success')

    return render_template("about.html", user=current_user)


@views.route('/delete-note', methods=['POST'])
def delete_note():
    note = json.loads(request.data)
    noteId = note['noteId']
    if note := Note.query.get(noteId):
        if note.user_id == current_user.id:
            db.session.delete(note)
            db.session.commit()

    return jsonify({})


@views.route('/delete-about', methods=['POST'])
def delete_about():
    about = json.loads(request.data)
    aboutId = about['aboutId']
    if about := About.query.get(aboutId):
        if about.user_id == current_user.id:
            db.session.delete(about)
            db.session.commit()

    return jsonify({})
