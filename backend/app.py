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

        # Chart
        sales_series = cleaned_df.set_index('Date')['Quantity'].resample('M').sum()
        chart_path = plot_sales_trend(sales_series)

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
