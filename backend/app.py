from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
import os
from insights import generate_all_insights, clean_data, plot_sales_trend, show_columns

app = Flask(__name__)
CORS(app)
app.config['MAX_CONTENT_LENGTH'] = 50 * 1024 * 1024  # 50 MB


@app.route('/upload', methods=['POST'])
def upload_data():
    try:
        print("Upload endpoint called!")
        file = request.files['file']

        if file.filename.endswith('.csv'):
            df = pd.read_csv(file)
        elif file.filename.endswith(('.xls', '.xlsx')):
            df = pd.read_excel(file)
        else:
            return jsonify({'error': 'Unsupported file format'}), 400

        # Clean and insights
        cleaned_df = clean_data(df)
        insights = generate_all_insights(df)

        # # Chart
        chart_path = plot_sales_trend(cleaned_df)

        # Add additional info
        insights['columns'] = show_columns(df)
        insights['sales_chart_url'] = chart_path

        return jsonify(insights)

    except Exception as e:
        print("Upload error:", e)
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    print("Starting Flask app on http://localhost:5000")
    app.run(debug=True)





# from flask import Flask, request, jsonify
# from flask_cors import CORS
# from pymongo import MongoClient
# import pandas as pd
# import os
# import datetime
# import base64

# from insights import generate_all_insights, clean_data, plot_sales_trend, show_columns

# app = Flask(__name__)
# CORS(app)

# # MongoDB config
# MONGO_URI = 'mongodb+srv://sandeepdbuser:J40ReFgGPwQXsXh8@cluster0.vyyyera.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'  # Replace with your MongoDB connection string
# client = MongoClient(MONGO_URI)
# db = client['smartcart']  # DB name
# files_collection = db['uploaded_files']  # Collection name

# @app.route('/upload', methods=['POST'])
# def upload_data():
#     try:
#         print("Upload endpoint called!")
#         file = request.files['file']
#         filename = file.filename

#         if filename.endswith('.csv'):
#             df = pd.read_csv(file)
#         elif filename.endswith(('.xls', '.xlsx')):
#             df = pd.read_excel(file)
#         else:
#             return jsonify({'error': 'Unsupported file format'}), 400




#         cleaned_df = clean_data(df)
#         insights = generate_all_insights(df)

#         # Plot chart
#         sales_series = cleaned_df.set_index('Date')['Quantity'].resample('Y').sum()
#         chart_path = plot_sales_trend(sales_series)

#         # Collect additional metadata
#         columns = show_columns(df)
#         insights['columns'] = columns
#         insights['sales_chart_url'] = chart_path



#         # Encode file content as base64 (optional: store as text, or store only filename)
#         file.seek(0)
#         encoded_content = base64.b64encode(file.read()).decode('utf-8')




#         # Save in MongoDB
#         document = {
#             'filename': filename,
#             'uploaded_at': datetime.datetime.now(),
#             'file_content': encoded_content,
#             'insights': insights
#         }
#         insert_result = files_collection.insert_one(document)

#         return jsonify({insights})

#     except Exception as e:
#         print("Upload error:", e)
#         return jsonify({'error': str(e)}), 500

# if __name__ == '__main__':
#     print("Starting Flask app on http://localhost:5000")
#     app.run(debug=True)
