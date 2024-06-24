using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace VotingBackend.Migrations
{
    /// <inheritdoc />
    public partial class Version3 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "end_date",
                table: "voting",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "owner_address",
                table: "voting",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "start_date",
                table: "voting",
                type: "text",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "end_date",
                table: "voting");

            migrationBuilder.DropColumn(
                name: "owner_address",
                table: "voting");

            migrationBuilder.DropColumn(
                name: "start_date",
                table: "voting");
        }
    }
}
